import { createAction, createSlice, PayloadAction } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { prefixActionType } from '../../utils';

export const slice = 'count';

const prefix = prefixActionType(slice);

export type Count = number;

const initialState: Count = 0;

export const createGetCount = createAction(prefix('get'));

export type CreateDecrementBy = SliceActionCreator<Count>;

export type DecrementByAction = ReturnType<CreateDecrementBy>;

export type CreateSetCountAction = PayloadAction<Count>;

export const {
  reducer,
  actions: {
    setCount: createSetCount,
    increment: createIncrement,
    decrementBy: createDecrementBy,
  },
  selectors: { getCount: selectCount },
} = createSlice({
  slice,
  initialState,
  reducers: {
    setCount: (_, { payload: count }: CreateSetCountAction) => count,
    increment: count => count + 1,
    decrementBy: (count, { payload: amount }: DecrementByAction) =>
      count - amount,
  },
});

export default reducer;
