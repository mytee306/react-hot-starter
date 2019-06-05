import { Epic, ofType } from 'redux-observable';
import { authState } from 'rxfire/auth';
import { of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import firebase from '../../firebase';
import { createReset } from '../reducer';
// import { collectionData } from 'rxfire/firestore';
import {
  AuthStateChange,
  createAuthStateChange,
  createLogin,
  createLogout,
  createSetUser,
  createSetUserError,
  User,
} from '../slices/auth';

const mapAuthStateChangeToUser = pipe(
  ofType<AuthStateChange>(createAuthStateChange.toString()),
  map(({ payload }) => payload),
);

const logIn: Epic = action$ =>
  action$.pipe(
    ofType(createLogin.toString()),
    switchMap(() => authState(firebase.auth())),
    map(user => createAuthStateChange(user)),
    catchError(({ message }) => of(createSetUserError(message))),
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
    catchError(({ message }) => of(createSetUserError(message))),
  );

export default [logIn, userUpdated, loggedOut, logOut];
