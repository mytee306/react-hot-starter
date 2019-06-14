import { createAction, createSlice, PayloadAction } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { createSelector } from 'reselect';
import { prefixActionType } from '../../utils';

export const slice = 'countSlice';

const prefix = prefixActionType(slice);

const initialState = {
  count: 0,
  loading: false,
};

export type CountState = typeof initialState;

export const createGetCount = createAction(prefix('get'));

export const createUpdateCount = createAction(prefix('update'));

export type CreateDecrementBy = SliceActionCreator<CountState['count']>;

export type DecrementByAction = ReturnType<CreateDecrementBy>;

export type CreateSetCountAction = PayloadAction<CountState['count']>;

export const {
  reducer,
  actions: {
    setCount: createSetCount,
    increment: createIncrement,
    decrementBy: createDecrementBy,
  },
  selectors: { getCountSlice: selectCountSlice },
} = createSlice({
  slice,
  initialState,
  reducers: {
    setCount: (_, { payload }: CreateSetCountAction) => ({
      count: payload,
      loading: false,
    }),
    increment: state => ({ ...state, loading: true }),
    decrementBy: (state, { payload: amount }: DecrementByAction) => {
      const { count } = state;

      return { ...state, count: count - amount };
    },
  },
});

export default reducer;

export const selectCount = createSelector(
  selectCountSlice,
  ({ count }) => count,
);
export const selectCountLoading = createSelector(
  selectCountSlice,
  ({ loading }) => loading,
);
