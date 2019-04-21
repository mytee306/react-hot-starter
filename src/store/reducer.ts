import { combineReducers } from 'redux';
import { createSelector } from 'redux-starter-kit';
import count, { Count } from './slices/count';

export type State = {
  count: Count;
};

export default combineReducers<State>({
  count,
});

export const selectCount = createSelector<State, Count>([
  (state: State) => state.count,
]);
