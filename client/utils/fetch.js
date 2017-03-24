import { API } from 'config';
import { setServices } from 'za-fetch-api';

setServices(API);

export { fetchAPI, getURL } from 'za-fetch-api';
