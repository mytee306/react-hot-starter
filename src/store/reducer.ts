import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { combineReducers } from 'redux';
import { createSelector, defaultMemoize } from 'reselect';
import count, { Count } from './slices/count';
import theme from './slices/theme';

export interface State {
  count: Count;
  theme: ThemeOptions;
}

export default combineReducers<State>({
  count,
  theme,
});

export const selectCount = defaultMemoize((state: State) => state.count);

export const selectTheme = (state: State) => state.theme;

export const selectPaletteType = createSelector(
  selectTheme,
  ({ palette = {} }) => palette.type,
);

export const selectDarkThemeFlag = createSelector(
  selectPaletteType,
  type => type === 'dark',
);
