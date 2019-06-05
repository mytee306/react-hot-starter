import { createLocation } from 'history';
import { Epic, ofType } from 'redux-observable';
import { authState } from 'rxfire/auth';
import { of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import firebase from '../../firebase';
import { createReset } from '../reducer';
// import { collectionData } from 'rxfire/firestore';
import {
  Account,
  AuthStateChange,
  createAuthStateChange,
  createGetAccount,
  createSetAccount,
  createSetAccountError,
} from '../slices/account';

const getAccount = pipe(
  ofType<AuthStateChange>(createAuthStateChange.toString()),
  map(({ payload }) => payload),
);

const logIn: Epic = action$ =>
  action$.pipe(
    ofType(createGetAccount.toString()),
    switchMap(() => authState(firebase.auth())),
    map(account => createAuthStateChange(account)),
    catchError(({ message }) => of(createSetAccountError(message))),
  );

const loggedIn: Epic = action$ =>
  action$.pipe(
    getAccount,
    filter<Account>(Boolean),
    map(account => createSetAccount(account)),
  );

const loggedOut: Epic = action$ =>
  action$.pipe(
    getAccount,
    filter(account => !account),
    map(() => createReset()),
  );

const logOut: Epic = action$ =>
  action$.pipe(
    ofType(createLocation.toString()),
    map(() => createReset()),
    catchError(({ message }) => of(createSetAccountError(message))),
  );

export default [logIn, loggedIn, loggedOut, logOut];
