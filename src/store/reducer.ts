import { isEmpty } from 'ramda';
import { combineReducers } from 'redux';
import { createAction } from 'redux-starter-kit';
import { createSelector } from 'reselect';
import { createDeepSelector } from 'utils';
import {
  auth,
  count,
  images,
  router,
  selectSnackbar as selectSnackbarState,
  snackbar,
  theme,
} from './slices';

const reducer = combineReducers({
  count,
  theme,
  auth,
  snackbar,
  images,
  router,
});

export type State = ReturnType<typeof reducer>;

export type Reducer = typeof reducer;

export const createReset = createAction('RESET');

const reducerWithReset: Reducer = (state, action) =>
  action.type === createReset.toString()
    ? reducer(undefined, action)
    : reducer(state, action);

export default reducerWithReset;

export const initialState = reducer(undefined, { type: 'TEST' });

export const selectTheme = (state: State) => state.theme;

export const selectPaletteType = createSelector(
  selectTheme,
  ({ palette }) => palette.type,
);

export const selectDarkThemeFlag = createSelector(
  selectPaletteType,
  type => type === 'dark',
);

export const selectAuth = (state: State) => state.auth;

export const selectUser = createDeepSelector(selectAuth, ({ user }) => user);

export const selectUid = createSelector(
  selectUser,
  ({ uid }) => uid,
);

export const selectSignedInFlag = createSelector(
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

export const selectSnackbar = createDeepSelector(
  selectSnackbarState,
  ({ queue }) => {
    const isQueueEmpty = isEmpty(queue);

    return {
      queue: isQueueEmpty
        ? queue.concat({ message: '', variant: 'default' })
        : queue,
      open: !isQueueEmpty,
    };
  },
);

export const selectAuthLoadingFlag = createSelector(
  selectAuth,
  ({ isLoading }) => isLoading,
);
