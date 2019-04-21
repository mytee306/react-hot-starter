import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { combineReducers } from 'redux';
import { createSelector } from 'redux-starter-kit';
import count, { Count } from './slices/count';
import theme from './slices/theme';

export type State = {
  count: Count;
  theme: ThemeOptions;
};

export default combineReducers<State>({
  count,
  theme,
});

export const selectCount = createSelector<State, Count>([
  (state: State) => state.count,
]);

export const selectTheme = createSelector<State, ThemeOptions>([
  (state: State) => state.theme,
]);
