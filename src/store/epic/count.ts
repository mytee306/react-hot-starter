import 'firebase/firestore';
import { inc } from 'ramda';
import { Selector } from 'react-redux';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { docData } from 'rxfire/firestore';
import { empty, of, pipe } from 'rxjs';
import { catchError, first, map, mergeMap, mergeMapTo, switchMap, withLatestFrom } from 'rxjs/operators';
import firebase from '../../firebase';
import { selectUid, State } from '../reducer';
import { CountState, createGetCount, createIncrement, createSetCount, initialState, selectCountValue, createDecrementBy } from '../slices/count';
import { createSetSnackbar } from '../slices/snackbar';

export const selectState = <R>(selector: Selector<State, R>) => (
  state$: StateObservable<State>,
) =>
  pipe(
    mergeMap(() => state$.pipe(first())),
    map(selector),
  );

const countsCollection = firebase.firestore().collection('counts');

const setCount = (state$: StateObservable<State>) => pipe(
  withLatestFrom(state$.pipe(map(selectUid))),
  switchMap(([value, uid]) => countsCollection.doc(uid).set({ value })),
  mergeMapTo(empty()),
  catchError(({ message }) => of(createSetSnackbar({ message }))),
);

const getCount: Epic = (action$, state$) =>
  action$.pipe(
    ofType(createGetCount.toString()),
    selectState(selectUid)(state$),
    map(uid => countsCollection.doc(uid)),
    switchMap(doc => docData<Pick<CountState, 'value'>>(doc)),
    map(({ value = initialState.value }) => value),
    map(createSetCount),
    catchError(({ message }) => of(createSetSnackbar({ message }))),
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
