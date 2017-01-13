import Express from 'express';
import config from './config/config';
import logger from './config/logger';
import express from './config/express';
import router from './config/router';

global.__CONFIG__ = config;
global.logger = logger;

const app = Express();

// Bootstrap application settings
express(app);

// Bootstrap webpackIsomorphicTools refresh
app.use((req, res, next) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }
  next();
});

// Bootstrap route
router(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.info(`==> 🍺  Express server running at localhost: ${PORT}`);
});
