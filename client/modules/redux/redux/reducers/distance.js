import { REQUEST, RECEIVE } from '../actions';

export default function distance(state = '请输入地址', action) {
  switch (action.type) {
    case REQUEST:
      return '计算中';
    case RECEIVE:
      return action.distance;
    default:
      return state;
  }
}
