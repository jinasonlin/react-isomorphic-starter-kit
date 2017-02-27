import { fetchAPI } from 'utils/fetch';

import {
  addLoading,
  removeLoading,
} from './loading';

export const REQUEST = 'REQUEST';
function request() {
  return {
    type: REQUEST,
  };
}

export const RECEIVE = 'RECEIVE';
function receive(distance) {
  return {
    type: RECEIVE,
    distance: `${distance}米`,
  };
}

export function calculate(params) {
  return async (dispatch) => {
    const fetchSymbol = Symbol('calculate');
    dispatch(request());
    dispatch(addLoading(fetchSymbol));

    function getLocations({ work, home }, key) {
      const addressString = `${work}|${home}`;
      const url = `${location.protocol}//restapi.amap.com/v3/geocode/geo?address=${addressString}&batch=true&key=${key}`;
      return fetchAPI({ url, withCredentials: false })
        .then(json => ({
          origins: json.geocodes[0].location,
          destination: json.geocodes[1].location,
        }));
    }

    function getDistance({ origins, destination }, key) {
      const url = `${location.protocol}//restapi.amap.com/v3/distance?origins=${origins}&destination=${destination}&key=${key}`;
      return fetchAPI({ url, withCredentials: false })
        .then(json => json.results[0].distance);
    }

    const locations = await getLocations({ ...params }, params.key);
    const distance = await getDistance(locations, params.key);

    dispatch(receive(distance));
    dispatch(removeLoading(fetchSymbol));
  };
}
