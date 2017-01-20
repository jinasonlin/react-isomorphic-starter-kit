import { ADDLOADING, REMOVELOADING } from '../actions';

export default function loading(state = new Set(), action) {
  switch (action.type) {
    case ADDLOADING: {
      const setAdd = new Set(state);
      setAdd.add(action.symbol);
      return setAdd;
    }
    case REMOVELOADING: {
      const setDel = new Set(state);
      setDel.delete(action.symbol);
      return setDel;
    }
    default:
      return state;
  }
}
