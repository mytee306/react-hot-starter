import { createLocation } from 'history';
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
  createGetUser,
  createSetUser,
  createSetUserError,
  User,
} from '../slices/user';

const getUser = pipe(
  ofType<AuthStateChange>(createAuthStateChange.toString()),
  map(({ payload }) => payload),
);

const logIn: Epic = action$ =>
  action$.pipe(
    ofType(createGetUser.toString()),
    switchMap(() => authState(firebase.auth())),
    map(user => createAuthStateChange(user)),
    catchError(({ message }) => of(createSetUserError(message))),
  );

const loggedIn: Epic = action$ =>
  action$.pipe(
    getUser,
    filter<User>(Boolean),
    map(user => createSetUser(user)),
  );

const loggedOut: Epic = action$ =>
  action$.pipe(
    getUser,
    filter(user => !user),
    map(() => createReset()),
  );

const logOut: Epic = action$ =>
  action$.pipe(
    ofType(createLocation.toString()),
    map(() => createReset()),
    catchError(({ message }) => of(createSetUserError(message))),
  );

export default [logIn, loggedIn, loggedOut, logOut];
