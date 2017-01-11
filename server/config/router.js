import health from './routes/health';
import home from './routes/home';
import redux from './routes/redux';
import error from './routes/error';

export default function (app) {
  health(app);
  home(app);
  redux(app);
  error(app);
}
