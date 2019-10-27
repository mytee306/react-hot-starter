import { createSlice } from 'redux-starter-kit';
import { createSelector } from 'reselect';

export const routerSliceName = 'router';

const initialState = {
  pageFound: true,
};
export type RouterState = typeof initialState;

const routerSlice = createSlice({
  slice: routerSliceName,
  initialState,
  reducers: {
    togglePageFound: ({ pageFound }) => ({
      pageFound: !pageFound,
    }),
  },
});

export const {
  actions: { togglePageFound: createTogglePageFound },
  selectors: { getRouter: selectRouter },
} = routerSlice;

export default routerSlice.reducer;

export type CreateTogglePageFound = typeof createTogglePageFound;
export type TogglePageFoundAction = ReturnType<CreateTogglePageFound>;

export type RouterAction = TogglePageFoundAction;

export const selectPageFound = createSelector(
  selectRouter,
  ({ pageFound }) => pageFound,
);
