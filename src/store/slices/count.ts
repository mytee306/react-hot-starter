import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Count = number;

export type IncrementPayload = void;

export type DecrementByPayload = Count;

export type CountPayload = IncrementPayload | DecrementByPayload;

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
