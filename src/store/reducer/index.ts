import { combineReducers } from 'redux';
import count, { Count } from './count';

export type State = {
  count: Count;
};

export default combineReducers({
  count,
});

export const selectCount = (state: State) => state.count;
