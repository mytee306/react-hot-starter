import { createLocation } from 'history';
import { Epic, ofType } from 'redux-observable';
import { authState } from 'rxfire/auth';
import { merge, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import firebase from '../../firebase';
import { createReset } from '../reducer';
// import { collectionData } from 'rxfire/firestore';
import {
  createGetAccount,
  createSetAccount,
  createSetAccountError,
} from '../slices/account';

const logIn: Epic = action$ => {
  const state$ = action$.pipe(
    ofType(createGetAccount.toString()),
    switchMap(() => authState(firebase.auth())),
    catchError(({ message }) => of(createSetAccountError(message))),
  );

  const loggedIn$ = state$.pipe(
    filter(Boolean),
    map(account => createSetAccount(account)),
  );

  const loggedOut$ = state$.pipe(
    filter(account => !account),
    map(() => createReset()),
  );

  return merge(loggedIn$, loggedOut$);
};

const logOut: Epic = action$ =>
  action$.pipe(
    ofType(createLocation.toString()),
    map(() => createReset()),
    catchError(({ message }) => of(createSetAccountError(message))),
  );

export default [logIn, logOut];
