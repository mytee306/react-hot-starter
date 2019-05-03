import {
  createSlice,
  PayloadAction,
} from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';

export type Count = number;

export type DecrementByAction = PayloadAction<Count>;

export type CreateDecrementByAction = SliceActionCreator<Count>;

export const {
  slice,
  reducer,
  actions: {
    increment: createIncrementAction,
    decrementBy: createDecrementByAction,
  },
  selectors: { getCount },
} = createSlice({
  slice: 'count',
  initialState: 0,
  reducers: {
    increment: count => count + 1,
    decrementBy: (count, { payload: amount }: DecrementByAction) =>
      count - amount,
  },
});

export default reducer;
