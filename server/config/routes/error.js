import React from 'react';
import { renderToString } from 'react-dom/server';
import NotFoundView from 'modules/error/components/notfound';
import UnauthorizedView from 'modules/error/components/unauthorized';
import ErrorView from 'modules/error/components/error';
import { serverStaticRender } from '../render';

export default function (app) {
  app.get('/403', (req, res, ...args) => {
    res.status(403);
    serverStaticRender({
      page: 'error_403',
      component: renderToString(<UnauthorizedView />),
    }, req, res, ...args);
  });
  app.get('/404', (req, res, ...args) => {
    res.status(404);
    serverStaticRender({
      page: 'error_404',
      component: renderToString(<NotFoundView />),
    }, req, res, ...args);
  });
  app.get('/500', (req, res, ...args) => {
    res.status(500);
    serverStaticRender({
      page: 'error_500',
      component: renderToString(<ErrorView />),
    }, req, res, ...args);
  });

  app.use((err, req, res, next) => {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    logger.error(err.stack);
    res.status(500).render('error_500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use((req, res) => {
    res.status(404).render('error_404', {
      url: req.originalUrl,
      error: 'Not found',
    });
  });
}
