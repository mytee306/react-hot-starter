import { combineReducers } from 'redux';
import { createSelector, defaultMemoize } from 'reselect';
import count from './slices/count';
import theme from './slices/theme';
import account from './slices/account';

const reducer = combineReducers({
  count,
  theme,
  account,
});

export default reducer;

export type State = ReturnType<typeof reducer>;

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
