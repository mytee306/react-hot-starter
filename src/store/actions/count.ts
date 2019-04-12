import {
  Action,
  ActionWithPayload,
  createActionCreator,
  createActionCreatorWithPayload,
} from 'redux-utils';
import { Count } from '../reducer/count';

export const CountActionTypes = {
  Increment: '[Count] Increment',
  DecrementBy: '[Count] Decrement By Amount',
};

export type Increment = Action;
export type DecrementBy = ActionWithPayload<Count>;

export const increment = createActionCreator(CountActionTypes.Increment);

export const decrementBy = createActionCreatorWithPayload<Count>(
  CountActionTypes.DecrementBy,
);

export type CountAction = Increment | DecrementBy;
