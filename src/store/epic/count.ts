import 'firebase/firestore';
import { inc } from 'ramda';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { docData } from 'rxfire/firestore';
import { empty, of, pipe } from 'rxjs';
import {
  catchError,
  map,
  mergeMapTo,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import firebase from '../../firebase';
import { selectState, takeUntilSignedOut } from '../../utils/operators';
import { selectUid, State } from '../reducer';
import {
  CountState,
  createDecrementBy,
  createGetCount,
  createIncrement,
  createSetCount,
  selectCountValue,
} from '../slices/count';
import { createSetErrorSnackbar } from '../slices/snackbar';

const countsCollection = firebase.firestore().collection('counts');

const setCount = (state$: StateObservable<State>) =>
  pipe(
    withLatestFrom(state$.pipe(map(selectUid))),
    switchMap(([value, uid]) => countsCollection.doc(uid).set({ value })),
    mergeMapTo(empty()),
    catchError(({ message }) => of(createSetErrorSnackbar({ message }))),
  );

const getCount: Epic = (action$, state$) =>
  action$.pipe(
    ofType(createGetCount.toString()),
    selectState(selectUid)(state$),
    map(uid => countsCollection.doc(uid)),
    switchMap(doc =>
      docData<Pick<CountState, 'value'>>(doc).pipe(takeUntilSignedOut(state$)),
    ),
    map(({ value }) => value),
    map(createSetCount),
    catchError(({ message }) => of(createSetErrorSnackbar({ message }))),
  );

const increment: Epic = (action$, state$) =>
  action$.pipe(
    ofType(createIncrement.toString()),
    selectState(selectCountValue)(state$),
    map(inc),
    setCount(state$),
  );

const decrementBy: Epic = (action$, state$) =>
  action$.pipe(
    ofType(createDecrementBy.toString()),
    map(({ payload }) => payload),
    withLatestFrom(state$.pipe(map(selectCountValue))),
    map(([amount, value]) => value - amount),
    setCount(state$),
  );

export default [getCount, increment, decrementBy];
