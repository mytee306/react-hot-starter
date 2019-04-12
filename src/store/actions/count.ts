import { createAction, PayloadAction } from 'redux-starter-kit';
import { Action } from 'redux-utils';
import { Count } from '../reducer/count';

export type Increment = Action;

export type DecrementBy = PayloadAction<Count>;

export const increment = createAction<void>('[Count] Increment');

export const decrementBy = createAction<Count>('[Count] Decrement By');
