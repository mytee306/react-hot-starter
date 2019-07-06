import { isEmpty } from 'ramda';
import { combineReducers } from 'redux';
import { createAction } from 'redux-starter-kit';
import { createSelector, defaultMemoize } from 'reselect';
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

export const selectTheme = defaultMemoize((state: State) => state.theme);

export const selectPaletteType = createSelector(
  selectTheme,
  ({ palette }) => palette.type,
);

export const selectDarkThemeFlag = createSelector(
  selectPaletteType,
  type => type === 'dark',
);

export const selectAuth = defaultMemoize((state: State) => state.auth);

export const selectUser = createSelector(
  selectAuth,
  ({ user }) => user,
);

export const selectDisplayName = createSelector(
  selectUser,
  ({ displayName }) => displayName,
);

export const selectUid = createSelector(
  selectUser,
  ({ uid }) => uid,
);

export const selectSignedInFlag = createSelector(
  selectUid,
  Boolean,
);

export const selectSnackbar = createSelector(
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
