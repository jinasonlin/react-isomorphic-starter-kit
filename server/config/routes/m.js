import { serverRender, pageRender } from '../render';

export default function (app) {
  app.get('{/m|/m/*}', (...args) => {
    pageRender({
      page: 'm'
    }, ...args);
  });
}
