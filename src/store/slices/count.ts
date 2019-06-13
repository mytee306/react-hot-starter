import { createAction, createSlice } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { prefixActionType } from '../../utils';

export const slice = 'count';

const prefix = prefixActionType(slice);

export type Count = number;

const initialState: Count = 0;

export const createGetCount = createAction(prefix('get'));

export type CreateDecrementBy = SliceActionCreator<Count>;

export type DecrementByAction = ReturnType<CreateDecrementBy>;

export const {
  reducer,
  actions: { increment: createIncrement, decrementBy: createDecrementBy },
  selectors: { getCount: selectCount },
} = createSlice({
  slice,
  initialState,
  reducers: {
    increment: count => count + 1,
    decrementBy: (count, { payload: amount }: DecrementByAction) =>
      count - amount,
  },
});

export default reducer;
