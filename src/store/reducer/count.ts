import { createReducer } from 'redux-starter-kit';
import { DecrementBy, decrementBy, increment } from '../actions/count';

export type Count = number;

export const initialState: Count = 0;

export default createReducer(initialState, {
  [increment.type]: count => count + 1,
  [decrementBy.type]: (count, { payload }: DecrementBy) => count - payload,
});
