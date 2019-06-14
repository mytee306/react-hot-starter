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
    map(uid => countsCollection.doc(uid)),
    switchMap(doc => docData<{ count: Count }>(doc)),
    map(({ count }) => count),
    map(createSetCount),
    catchError(({ message }) => of(createSetAuthError(message))),
  );

export default [getCount];
