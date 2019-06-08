import { Epic, ofType } from 'redux-observable';
import { authState } from 'rxfire/auth';
import { empty, of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap, tap, mergeMap } from 'rxjs/operators';
import firebase from '../../firebase';
import { createReset } from '../reducer';
// import { collectionData } from 'rxfire/firestore';
import {
  AuthStateChangeAction,
  createAuthStateChange,
  createLogin,
  createLogout,
  createSetAuthError,
  createSetUser,
  SetAuthErrorAction,
  User,
} from '../slices/auth';

const mapAuthStateChangeToUser = pipe(
  ofType<AuthStateChangeAction>(createAuthStateChange.toString()),
  map(({ payload }) => payload),
);

const logIn: Epic = action$ =>
  action$.pipe(
    ofType(createLogin.toString()),
    switchMap(() => authState(firebase.auth())),
    map(user => createAuthStateChange(user)),
    catchError(({ message }) => of(createSetAuthError(message))),
  );

const userUpdated: Epic = action$ =>
  action$.pipe(
    mapAuthStateChangeToUser,
    filter<User>(Boolean),
    map(user => createSetUser(user)),
  );

const loggedOut: Epic = action$ =>
  action$.pipe(
    mapAuthStateChangeToUser,
    filter(user => !user),
    map(() => createReset()),
  );

const logOut: Epic = action$ =>
  action$.pipe(
    ofType(createLogout.toString()),
    map(() => createReset()),
    catchError(({ message }) => of(createSetAuthError(message))),
  );

const authError: Epic = action$ =>
  action$.pipe(
    ofType<SetAuthErrorAction>(createSetAuthError.toString()),
    tap(console.error),
    mergeMap(() => empty()),
  );

export default [logIn, userUpdated, loggedOut, logOut, authError];
