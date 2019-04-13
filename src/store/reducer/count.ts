import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Count = number;

const slice = createSlice<Count, PayloadAction<void | number>>({
  slice: 'count',
  initialState: 0,
  reducers: {
    increment: count => count + 1,
    decrementBy: (count, { payload }) => count - (payload as Count),
  },
});

export default slice.reducer;

export const {
  actions: { increment, decrementBy },
  selectors: { getCount },
} = slice;
