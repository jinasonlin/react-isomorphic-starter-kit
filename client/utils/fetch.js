import { API } from 'config';
import { setServices } from './fetchAPI';

setServices(API);

export { fetchAPI, getURL } from './fetchAPI';
