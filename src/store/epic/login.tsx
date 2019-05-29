import { Epic, ofType } from 'redux-observable';
import { empty, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { authState } from 'rxfire/auth';
import { collectionData } from 'rxfire/firestore';
import {
  createGetAccountAction,
  createSetAccountAction,
  createSetAccountErrorAction,
  initialAccount,
} from '../slices/account';

const logIn: Epic = action$ =>
  action$.pipe(
    ofType(createGetAccountAction.toString()),
    switchMap(() => empty()),
    catchError(({ message }) => of(createSetAccountErrorAction(message))),
  );

// todo listen for logout event
// todo add logout success and error handling for manual logout
const logOut: Epic = action$ =>
  action$.pipe(
    ofType(createSetAccountAction.toString()),
    map(() => createSetAccountAction(initialAccount)),
  );

export default [logIn, logOut];
