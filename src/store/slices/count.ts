import {
  createSlice,
  PayloadAction,
} from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';

export type Count = number;

export type DecrementByAction = PayloadAction<Count>;

export type CreateDecrementBy = SliceActionCreator<Count>;

export const {
  slice,
  reducer,
  actions: {
    createIncrement,
    createDecrementBy,
  },
  selectors: { getCount: selectCount },
} = createSlice({
  slice: 'count',
  initialState: 0,
  reducers: {
    createIncrement: count => count + 1,
    createDecrementBy: (count, { payload: amount }: DecrementByAction) =>
      count - amount,
  },
});

export default reducer;
