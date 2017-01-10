import health from './routes/health';
import home from './routes/home';
import m from './routes/m';
import redux from './routes/redux';
import error from './routes/error';

export default function (app) {
  health(app);
  home(app);
  m(app);
  redux(app);
  error(app);
}
