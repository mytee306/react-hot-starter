import { auth } from 'firebase/app';
import { Epic, ofType } from 'redux-observable';
import { authState } from 'rxfire/auth';
import { of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { createReset } from '../reducer';
import {
  AuthStateChangeAction,
  authStateChangeType,
  createAuthStateChange,
  createSetAuthError,
  createSetUser,
  createSignin,
  createSignout,
  SetAuthErrorAction,
  User,
} from '../slices/auth';
import { createSetSnackbar } from '../slices/snackbar';

const mapAuthStateChangeToUser = pipe(
  ofType<AuthStateChangeAction>(authStateChangeType),
  map(({ payload }) => payload),
);

const signIn: Epic = action$ =>
  action$.pipe(
    ofType(createSignin.toString()),
    switchMap(() => {
      const provider = new auth.GoogleAuthProvider();

      return auth().signInWithPopup(provider);
    }),
    switchMap(() => authState(auth())),
    map(createAuthStateChange),
    catchError(({ message }) => of(createSetAuthError(message))),
  );

const userUpdated: Epic = action$ =>
  action$.pipe(
    mapAuthStateChangeToUser,
    filter<User>(Boolean),
    map(createSetUser),
  );

const signedOut: Epic = action$ =>
  action$.pipe(
    mapAuthStateChangeToUser,
    filter(user => !user),
    map(() => createReset()),
  );

const signOut: Epic = action$ =>
  action$.pipe(
    ofType(createSignout.toString()),
    switchMap(() => auth().signOut()),
    map(() => createReset()),
    catchError(({ message }) => of(createSetAuthError(message))),
  );

const authError: Epic = action$ =>
  action$.pipe(
    ofType<SetAuthErrorAction>(createSetAuthError.toString()),
    map(({ payload }) => payload),
    map(message => createSetSnackbar({ message })),
  );

export default [signIn, userUpdated, signedOut, signOut, authError];
