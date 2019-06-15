import 'firebase/firestore';
import { inc } from 'ramda';
import { Selector } from 'react-redux';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { docData } from 'rxfire/firestore';
import { empty, of, pipe } from 'rxjs';
import {
  catchError,
  first,
  map,
  mergeMap,
  mergeMapTo,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import firebase from '../../firebase';
import { selectUid, State } from '../reducer';
import {
  CountState,
  createGetCount,
  createIncrement,
  createSetCount,
  selectCount,
} from '../slices/countSlice';
import { createSetSnackbar } from '../slices/snackbar';

export const selectState = <R>(selector: Selector<State, R>) => (
  state$: StateObservable<State>,
) =>
  pipe(
    mergeMap(() => state$.pipe(first())),
    map(selector),
  );

const countsCollection = firebase.firestore().collection('counts');

const getCount: Epic = (action$, state$) =>
  action$.pipe(
    ofType(createGetCount.toString()),
    selectState(selectUid)(state$),
    map(uid => countsCollection.doc(uid)),
    switchMap(doc => docData<{ count: CountState['count'] }>(doc)),
    map(({ count }) => count),
    map(createSetCount),
    catchError(({ message }) => of(createSetSnackbar({ message }))),
  );

const increment: Epic = (action$, state$) =>
  action$.pipe(
    ofType(createIncrement.toString()),
    selectState(selectCount)(state$),
    map(inc),
    withLatestFrom(state$.pipe(map(selectUid))),
    switchMap(([count, uid]) => countsCollection.doc(uid).set({ count })),
    mergeMapTo(empty()),
    catchError(({ message }) => of(createSetSnackbar({ message }))),
  );

export default [getCount, increment];
