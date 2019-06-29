import { pipe } from 'ramda';
import { Selector } from 'react-redux';
import { StateObservable } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, first, map, mergeMap } from 'rxjs/operators';
import { State } from '../../store/reducer';
import { createSetErrorSnackbar } from '../../store/slices/snackbar';

export const selectState = <R>(selector: Selector<State, R>) => (
  state$: StateObservable<State>,
) =>
  pipe(
    mergeMap(() => state$.pipe(first())),
    map(selector),
  );

export const snackError = pipe(
  catchError(({ message }) => of(createSetErrorSnackbar({ message }))),
);
