import { Epic, ofType } from 'redux-observable';
import { authState } from 'rxfire/auth';
import { of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
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
import { createSetSnackbar } from '../slices/snackbar';

const mapAuthStateChangeToUser = pipe(
  ofType<AuthStateChangeAction>(createAuthStateChange.toString()),
  map(({ payload }) => payload),
);

const logIn: Epic = action$ =>
  action$.pipe(
    ofType(createLogin.toString()),
    switchMap(() => {
      const provider = new (firebase.auth as any).GoogleAuthProvider();

      return firebase.auth().signInWithPopup(provider);
    }),
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
    switchMap(() => firebase.auth().signOut()),
    map(() => createReset()),
    catchError(({ message }) => of(createSetAuthError(message))),
  );

const authError: Epic = action$ =>
  action$.pipe(
    ofType<SetAuthErrorAction>(createSetAuthError.toString()),
    map(({ payload }) => payload),
    map(message => createSetSnackbar({ message })),
  );

export default [logIn, userUpdated, loggedOut, logOut, authError];
