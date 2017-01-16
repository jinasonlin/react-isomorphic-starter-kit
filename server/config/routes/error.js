import React from 'react';
import { renderToString } from 'react-dom/server';
import { serverStaticRender } from '../render';
import NotFoundPage from 'modules/error/notfound';

export default function (app) {
  app.get('/404', function (req, res, ...args) {
    res.status(404);
    serverStaticRender({
      page: 'error',
      component: renderToString(<NotFoundPage />)
    }, req, res, ...args);
  });
  app.get('/500', function (req, res, ...args) {
    res.status(500);
    serverStaticRender({
      page: 'error',
      component: renderToString(<NotFoundPage />)
    }, req, res, ...args);
  });

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    logger.error(err.stack);
    res.status(500).render('error', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    res.status(404).render('error', {
      url: req.originalUrl,
      error: 'Not found',
    });
  });
}
