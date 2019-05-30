import { createLocation } from 'history';
import { Epic, ofType } from 'redux-observable';
import { authState } from 'rxfire/auth';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import firebase from '../../firebase';
import { createReset } from '../reducer';
// import { collectionData } from 'rxfire/firestore';
import {
  createGetAccount,
  createSetAccount,
  createSetAccountError,
} from '../slices/account';

const logIn: Epic = action$ =>
  action$.pipe(
    ofType(createGetAccount.toString()),
    switchMap(() => authState(firebase.auth())),
    map(account => createSetAccount(account)),
    catchError(({ message }) => of(createSetAccountError(message))),
  );

const logOut: Epic = action$ =>
  action$.pipe(
    ofType(createLocation.toString()),
    map(() => createReset()),
    catchError(({ message }) => of(createSetAccountError(message))),
  );

export default [logIn, logOut];
