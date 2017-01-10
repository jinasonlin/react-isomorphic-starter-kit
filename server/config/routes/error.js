import React from 'react';
import { renderToString } from 'react-dom/server';
import { serverStaticRender } from '../render';
import NotFoundPage from '../../../client/modules/error/notfound';

export default function (app) {
  app.get('(/404|/500)', function (...args) {
    serverStaticRender({
      page: 'error',
      component: renderToString(<NotFoundPage />)
    }, ...args);
  });

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    if (__DEBUG__) {
      console.error(err.stack);
    }
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
