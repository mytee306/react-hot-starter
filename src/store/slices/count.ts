import { createSlice } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';

export type Count = number;

export type CreateDecrementBy = SliceActionCreator<Count>;

export type DecrementByAction = ReturnType<CreateDecrementBy>;

export const {
  slice,
  reducer,
  actions: { increment: createIncrement, decrementBy: createDecrementBy },
  selectors: { getCount: selectCount },
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
