import { createReducer } from 'redux-starter-kit';
import { CountActionTypes, DecrementBy } from '../actions/count';

export type Count = number;

export const initialState: Count = 0;

export default createReducer(initialState, {
  [CountActionTypes.Increment]: state => state + 1,
  [CountActionTypes.DecrementBy]: (state, { payload }: DecrementBy) =>
    state - payload,
});
