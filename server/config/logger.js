import { name } from '../../package.json';
import fs from 'fs';
import { execSync } from 'child_process';
import winston from 'winston';
import 'winston-daily-rotate-file';
import config from './config';

const hostName = process.env.HOSTNAME || 'local';
const logPath = __DEVELOPMENT__ ? `${config.root}/logs` : `/alidata1/admin/${name}/logs`;
const logFile = `${logPath}/${hostName}_${name}.log`;
const errorLogFile = `${logPath}/${hostName}_${name}_error.log`;

// validate & create log path folder
let fileReady = true;
try {
  !fs.existsSync(logPath) && execSync(`mkdir -p ${logPath}`);
  !fs.existsSync(errorLogFile) && execSync(`echo > ${errorLogFile}`);
} catch (e) {
  fileReady = false;
  console.error(`fileReady fail`, e);
}

let logger = console;

if (fileReady) {
  const fileTransport = new winston.transports.DailyRotateFile({
    filename: logFile,
    datePattern: 'yyyy-MM-dd_',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info',
    timestamp: true,
  });

  const fileExceptionTransport = new winston.transports.File({
    filename: errorLogFile,
    prepend: true,
    timestamp: true,
  });

  let winstonConfig = {
    transports: [fileTransport],
  };

  if (__DEVELOPMENT__) {
    winstonConfig.transports.push(new winston.transports.Console({}));
  } else {
    winstonConfig.exceptionHandlers = [fileExceptionTransport];
    winstonConfig.exitOnError = false;
  }

  logger = new winston.Logger(winstonConfig);
}

export default logger;
