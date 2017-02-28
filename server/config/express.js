import express from 'express';
import compression from 'compression';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import consolidate from 'consolidate';
import pkg from '../../package.json';

export default function (app) {
  // Compression middleware (should be placed before express.static)
  app.use(compression());

  app.use(favicon(`${__dirname}/favicon.ico`));

  // Static files middleware; TODO in production use nginx or CDN
  app.use(express.static(`${__CONFIG__.root}/assets`));

  // Logging middleware
  if (__DEVELOPMENT__) {
    app.use(morgan('dev'));
  }

  // set views path, template engine and default layout
  app.engine('html', consolidate.lodash);
  app.engine('ejs', consolidate.ejs);
  app.set('views', `${__CONFIG__.root}/assets/views`);
  app.set('view engine', 'html');

  // check isWechatVisit
  app.use((req, res, next) => {
    const ua = req.headers['user-agent'];
    if (/MicroMessenger/.test(ua)) {
      req.isWechatVisit = true;
      next();
    } else {
      req.isWechatVisit = false;
      next();
    }
  });

  // expose params to views
  app.use((req, res, next) => {
    res.locals.env = __ENV__;
    res.locals.pkg = pkg;
    // set defalut locals
    res.locals.html = '';
    res.locals.script = '';
    next();
  });

  // cookieParser should be above session, if use session.
  app.use(cookieParser());

  // set '_e' in cookie
  app.use((req, res, next) => {
    const list = ['dev', 'test', 'pre', 'prd'];
    const value = list.indexOf(__ENV__);
    if (!req.cookies._e || req.cookies._e !== value) {
      res.cookie('_e', value);
    }
    next();
  });

  app.disable('x-powered-by');
  app.enable('trust proxy');
}
