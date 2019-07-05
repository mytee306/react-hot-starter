import { pipe } from 'ramda';
import { Selector } from 'react-redux';
import { StateObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, filter, first, map, mergeMap, takeUntil } from 'rxjs/operators';
import { selectSignedInFlag, State } from 'store/reducer';
import { createSetErrorSnackbar } from 'store/slices/snackbar';

export const selectState = <R>(selector: Selector<State, R>) => (
  state$: StateObservable<State>,
) =>
  pipe(
    mergeMap(() => state$.pipe(first())),
    map(selector),
  );

export const takeUntilSignedOut = <T>(state$: StateObservable<State>) =>
  pipe<Observable<T>, Observable<T>>(
    takeUntil(
      state$.pipe(
        map(selectSignedInFlag),
        filter(signedIn => !signedIn),
      ),
    ),
  );

export const snackError = pipe(
  catchError(({ message }) => of(createSetErrorSnackbar({ message }))),
);
