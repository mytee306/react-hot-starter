import {
  createAction,
  createSlice,
  PayloadAction,
  Reducer,
} from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { createSelector } from 'reselect';
import { prefixActionType } from 'utils';

export const countSliceName = 'count';

const prefix = prefixActionType(countSliceName);

export const initialState = {
  value: 0,
  isLoading: false,
};

export type CountState = typeof initialState;

export const createUpdateCount = createAction(prefix('update'));

export type CreateDecrementBy = SliceActionCreator<CountState['value']>;

export type DecrementByAction = ReturnType<CreateDecrementBy>;

export type CreateSetCountAction = PayloadAction<CountState['value']>;

const setLoading = (state: CountState) => ({ ...state, isLoading: true });

const countSlice = createSlice({
  slice: countSliceName,
  initialState,
  reducers: {
    get: state => ({ ...state, isLoading: true }),
    set: (_, { payload }: CreateSetCountAction) => ({
      value: payload,
      isLoading: false,
    }),
    increment: setLoading,
    decrementBy: setLoading as Reducer<CountState, DecrementByAction>,
  },
});

export const {
  actions: {
    get: createGetCount,
    set: createSetCount,
    increment: createIncrement,
    decrementBy: createDecrementBy,
  },
  selectors: { getCount: selectCount },
} = countSlice;

export default countSlice.reducer;

export const selectCountValue = createSelector(
  selectCount,
  ({ value }) => value,
);
export const selectCountLoadingFlag = createSelector(
  selectCount,
  ({ isLoading }) => isLoading,
);
