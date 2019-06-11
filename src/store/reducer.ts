import { combineReducers } from 'redux';
import { createAction } from 'redux-starter-kit';
import { createSelector, defaultMemoize } from 'reselect';
import count from './slices/count';
import theme from './slices/theme';
import auth from './slices/auth';
import snackbar, {
  selectSnackbar as selectSnackbarState,
} from './slices/snackbar';

const reducer = combineReducers({
  count,
  theme,
  auth,
  snackbar,
});

export type State = ReturnType<typeof reducer>;

export type Reducer = typeof reducer;

export const createReset = createAction('RESET');

const reducerWithReset: Reducer = (state, action) =>
  action.type === createReset.toString()
    ? reducer(undefined, action)
    : reducer(state, action);

export default reducerWithReset;

export const selectTheme = defaultMemoize((state: State) => state.theme);

export const selectPaletteType = createSelector(
  selectTheme,
  ({ palette }) => palette.type,
);

export const selectDarkThemeFlag = createSelector(
  selectPaletteType,
  type => type === 'dark',
);

export const selectUserSlice = defaultMemoize((state: State) => state.auth);

export const selectUser = createSelector(
  selectUserSlice,
  ({ user }) => user,
);
export const selectDisplayName = createSelector(
  selectUser,
  ({ displayName }) => displayName,
);

export const selectSignedInFlag = createSelector(
  selectDisplayName,
  Boolean,
);

export const selectSnackbar = createSelector(
  selectSnackbarState,
  snackbarState => {
    const { message } = snackbarState;

    return { ...snackbarState, open: Boolean(message) };
  },
);
