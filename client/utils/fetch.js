import { setServices } from 'fetch-api';
import { API } from 'config';

setServices(API);

export { fetchAPI, getURL } from 'fetch-api';
