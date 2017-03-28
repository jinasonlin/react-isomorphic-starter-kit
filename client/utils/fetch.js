import config from 'config';
import { setServices } from 'za-fetch-api';

setServices(config.API);

export { fetchAPI, getURL } from 'za-fetch-api';
