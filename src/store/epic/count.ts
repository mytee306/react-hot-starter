import { firestore } from 'firebase/app';
import { Epic, ofType } from 'redux-observable';
import { docData } from 'rxfire/firestore';
import { of } from 'rxjs';
import { catchError, first, map, mergeMap, switchMap } from 'rxjs/operators';
import { selectUid } from '../reducer';
import { createSetAuthError } from '../slices/auth';
import { Count, createGetCount, createSetCount } from '../slices/count';

const countsCollection = firestore().collection('counts');

const getCount: Epic = (action$, state$) =>
  action$.pipe(
    ofType(createGetCount.toString()),
    mergeMap(() => state$.pipe(first())),
    map(selectUid),
    switchMap(uid => {
      const countDoc = countsCollection.doc(uid);

      return docData<{ count: Count }>(countDoc);
    }),
    map(({ count }) => count),
    map(createSetCount),
    catchError(({ message }) => of(createSetAuthError(message))),
  );

export default [getCount];
