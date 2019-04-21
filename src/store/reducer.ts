import { combineReducers } from 'redux';
import { createSelector } from 'redux-starter-kit';
import count, { Count, countSlice } from './slices/count';

export type State = {
  [countSlice]: Count;
};

export default combineReducers({
  count,
});

export const selectCount = createSelector<State, Count>([
  (state: State) => state.count,
]);
