import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Count = number;

export type Increment = PayloadAction<void>;

export type DecrementBy = PayloadAction<Count>;

export type CountAction = Increment | DecrementBy;

const slice = createSlice<Count, CountAction>({
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
