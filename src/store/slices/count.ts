import {
  createSlice,
  PayloadAction,
} from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';

const initialState = 0;

export type Count = typeof initialState;

export type DecrementByAction = PayloadAction<Count>;

export type CreateDecrementByAction = SliceActionCreator<Count>;

export const {
  slice,
  reducer,
  actions: {
    increment: createIncrement,
    decrementBy: createDecrementBy,
  },
  selectors: { getCount },
} = createSlice({
  slice: 'count',
  initialState,
  reducers: {
    increment: count => count + 1,
    decrementBy: (count, { payload: amount }: DecrementByAction) =>
      count - amount,
  },
});

export default reducer;
