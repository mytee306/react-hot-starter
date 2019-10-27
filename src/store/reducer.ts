import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { createAction } from 'typesafe-actions';
import { createDeepSelector } from 'utils';
import {
  auth,
  AuthAction,
  AuthState,
  count,
  CountAction,
  CountState,
  images,
  ImagesAction,
  ImagesState,
  lang,
  LangAction,
  LangState,
  router,
  RouterAction,
  RouterState,
  snackbar,
  SnackbarAction,
  SnackbarState,
  theme,
  ThemeAction,
  ThemeState,
} from './slices';

export interface State {
  count: CountState;
  theme: ThemeState;
  auth: AuthState;
  snackbar: SnackbarState;
  images: ImagesState;
  router: RouterState;
  lang: LangState;
}

export type Action =
  | CountAction
  | ThemeAction
  | AuthAction
  | SnackbarAction
  | ImagesAction
  | RouterAction
  | LangAction;

const reducer = combineReducers<State>({
  count,
  theme,
  auth,
  snackbar,
  images,
  router,
  lang,
});

export type Reducer = typeof reducer;

export const resetType = 'RESET';
export const createReset = createAction(resetType);
export type CreateReset = typeof createReset;
export type ResetAction = ReturnType<CreateReset>;

export const testType = 'TEST';
export const createTest = createAction(testType);
export type CreateTest = typeof createTest;
export type TestAction = ReturnType<CreateTest>;

const reducerWithReset: Reducer = (state, action) =>
  action.type === createReset.toString()
    ? reducer(undefined, action)
    : reducer(state, action);

export default reducerWithReset;

export const initialState = reducer(undefined, createTest());

export const selectTheme = (state: State) => state.theme;

export const selectPaletteType = createSelector(
  selectTheme,
  ({ palette }) => palette.type,
);

export const selectIsPaletteDark = createSelector(
  selectPaletteType,
  type => type === 'dark',
);

export const selectAuth = (state: State) => state.auth;

export const selectUser = createDeepSelector(selectAuth, ({ user }) => user);

export const selectUid = createSelector(
  selectUser,
  ({ uid }) => uid,
);

export const selectIsSignedIn = createSelector(
  selectUid,
  Boolean,
);

export const selectDisplayName = createSelector(
  selectUser,
  ({ displayName }) => displayName || '',
);

export type DisplayName = ReturnType<typeof selectDisplayName>;

export const selectEmail = createSelector(
  selectUser,
  ({ email }) => email,
);

export const selectPhotoURL = createSelector(
  selectUser,
  ({ photoURL }) => photoURL || '',
);

export type PhotoURL = ReturnType<typeof selectPhotoURL>;

export const selectIsAuthLoading = createSelector(
  selectAuth,
  ({ isLoading }) => isLoading,
);
