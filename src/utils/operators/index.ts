import { pipe } from 'ramda';
import { Selector } from 'react-redux';
import { StateObservable } from 'redux-observable';
import { first, map, mergeMap } from 'rxjs/operators';
import { State } from '../../store/reducer';

export const selectState = <R>(selector: Selector<State, R>) => (
  state$: StateObservable<State>,
) =>
  pipe(
    mergeMap(() => state$.pipe(first())),
    map(selector),
  );
