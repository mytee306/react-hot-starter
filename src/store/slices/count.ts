import { createSlice, PayloadAction } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';

export type Count = number;

export type IncrementPayload = void;

export type DecrementByPayload = Count;

export type CountPayload = IncrementPayload | DecrementByPayload;

export type CountActionCreator = SliceActionCreator<CountPayload>;

const slice = createSlice<Count, PayloadAction<CountPayload>>({
  slice: 'count',
  initialState: 0,
  reducers: {
    increment: count => count + 1,
    decrementBy: (count, { payload }) =>
      count - (payload as DecrementByPayload),
  },
});

export default slice.reducer;

export const {
  actions: { increment, decrementBy },
} = slice;
