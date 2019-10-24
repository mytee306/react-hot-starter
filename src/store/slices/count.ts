import { createSlice, PayloadAction, Reducer } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { createSelector } from 'reselect';
import { createAction } from 'typesafe-actions';

export const countSliceName = 'count';

export const initialCountState = {
  value: 0,
  isLoading: false,
};

export type CountState = typeof initialCountState;

export const updateCountType = 'count/update';
export const createUpdateCount = createAction(updateCountType);
export type CreateUpdateCount = typeof createUpdateCount;
export type UpdateCountAction = ReturnType<CreateUpdateCount>;

export type CreateDecrementBy = SliceActionCreator<CountState['value']>;

export type DecrementByAction = ReturnType<CreateDecrementBy>;

export type CreateSetCountAction = PayloadAction<CountState['value']>;

const setLoading = (state: CountState) => ({ ...state, isLoading: true });

const countSlice = createSlice({
  slice: countSliceName,
  initialState: initialCountState,
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
export const selectIsCountLoading = createSelector(
  selectCount,
  ({ isLoading }) => isLoading,
);
