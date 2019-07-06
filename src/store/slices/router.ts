import { createSlice } from 'redux-starter-kit';
import { createSelector } from 'reselect';

const initialState = {
  pageFound: true,
};
export type RouterState = typeof initialState;

export const {
  slice,
  reducer,
  actions: { togglePageFound: createTogglePageFound },
  selectors: { getRouter: selectRouter },
} = createSlice({
  slice: 'router',
  initialState,
  reducers: {
    togglePageFound: ({ pageFound }) => ({
      pageFound: !pageFound,
    }),
  },
});

export default reducer;

export const selectPageFound = createSelector(
  selectRouter,
  ({ pageFound }) => pageFound,
);
