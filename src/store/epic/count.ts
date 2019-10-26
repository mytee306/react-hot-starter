import 'firebase/firestore';
import firebase from 'my-firebase';
import { inc, isNil } from 'ramda';
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
import { selectCountValue } from 'store/selectors';
import { getType } from 'typesafe-actions';
import { selectState, takeUntilSignedOut } from 'utils/operators';
import { selectUid, State } from '../reducer';
import {
  CountState,
  createSetErrorSnackbar,
  getCountAsync,
  incrementCountAsync,
  setCountAsync,
} from '../slices';

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
    ofType(getType(getCountAsync.request)),
    selectState(selectUid)(state$),
    map(uid => countsCollection.doc(uid)),
    switchMap(doc =>
      docData<Partial<Pick<CountState, 'value'>>>(doc).pipe(
        takeUntilSignedOut(state$),
      ),
    ),
    map(({ value }) => {
      if (isNil(value)) {
        return createSetErrorSnackbar({ message: 'Failed to fetch count.' });
      } else {
        return setCountAsync.success(value);
      }
    }),
  );

const increment: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(incrementCountAsync.request)),
    selectState(selectCountValue)(state$),
    map(inc),
    setCount(state$),
  );

const decrementBy: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(setCountAsync.request)),
    map(({ payload }) => payload),
    withLatestFrom(state$.pipe(map(selectCountValue))),
    map(([amount, value]) => value - amount),
    setCount(state$),
  );

export default [getCount, increment, decrementBy];
