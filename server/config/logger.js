import fs from 'fs';
import { execSync } from 'child_process';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { name } from '../../package.json';
import config from './config';

const hostName = process.env.HOSTNAME || 'local';
const logPath = __DEVELOPMENT__ ? `${config.root}/logs` : `/alidata1/admin/${name}/logs`;
const logFileName = `${logPath}/${hostName}_${name}`;
const errorLogFileName = `${logPath}/${hostName}_${name}_error`;

// validate & create log path folder
let fileReady = true;
try {
  !fs.existsSync(logPath) && execSync(`mkdir -p ${logPath}`);
  !fs.existsSync(`${errorLogFileName}.log`) && execSync(`echo > ${errorLogFileName}.log`);
} catch (e) {
  fileReady = false;
  console.error('fileReady fail', e);
}

function getLogger() {
  let logger;
  if (fileReady) {
    const fileTransport = new winston.transports.DailyRotateFile({
      filename: logFileName,
      datePattern: '_yyyy-MM-dd.log',
      level: process.env.ENV === 'development' ? 'debug' : 'info',
      timestamp: true,
    });

    const fileExceptionTransport = new winston.transports.File({
      filename: `${errorLogFileName}.log`,
      timestamp: true,
    });

    const winstonConfig = {
      transports: [new winston.transports.Console({}), fileTransport],
    };

    if (!__DEVELOPMENT__) {
      winstonConfig.exceptionHandlers = [fileExceptionTransport];
      winstonConfig.exitOnError = false;
    }

    logger = new winston.Logger(winstonConfig);
  } else {
    logger = console;
  }
  return logger;
}

const logger = getLogger();

export default logger;
