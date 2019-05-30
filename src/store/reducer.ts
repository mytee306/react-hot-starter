import { combineReducers } from 'redux';
import { createAction } from 'redux-starter-kit';
import { createSelector, defaultMemoize } from 'reselect';
import account from './slices/account';
import count from './slices/count';
import theme from './slices/theme';

const reducer = combineReducers({
  count,
  theme,
  account,
});

export type State = ReturnType<typeof reducer>;

export type Reducer = typeof reducer;

export const createReset = createAction('RESET');

const reducerWithReset: Reducer = (state, action) =>
  action.type === createReset.toString()
    ? reducer(undefined, action)
    : reducer(state, action);

export default reducerWithReset;

export const selectCount = defaultMemoize((state: State) => state.count);

export const selectTheme = defaultMemoize((state: State) => state.theme);

export const selectPaletteType = createSelector(
  selectTheme,
  ({ palette }) => palette.type,
);

export const selectDarkThemeFlag = createSelector(
  selectPaletteType,
  type => type === 'dark',
);

export const selectAccountSlice = defaultMemoize(
  (state: State) => state.account,
);

export const selectAccount = createSelector(
  selectAccountSlice,
  ({ core }) => core,
);
export const selectDisplayName = createSelector(
  selectAccount,
  ({ displayName }) => displayName,
);

export const selectLoggedInFlag = createSelector(
  selectDisplayName,
  Boolean,
  () => true, // todo remove line
);
