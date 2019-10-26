import { createAction } from 'typesafe-actions';

export const initialCountState = {
  value: 0,
  isLoading: false,
};

export type CountState = typeof initialCountState;

export const getCountType = 'count/get';
export const createGetCount = createAction(getCountType);
export type CreateGetCount = typeof createGetCount;
export type GetCountAction = ReturnType<CreateGetCount>;

export const setCountType = 'count/setCount';
export const createSetCount = createAction(
  setCountType,
  action => (payload: CountState['value']) => action(payload),
);
export type CreateSetCount = typeof createSetCount;
export type SetCountAction = ReturnType<CreateSetCount>;

export const decrementByType = 'count/decrementBy';
export const createDecrementBy = createAction(
  decrementByType,
  action => (payload: CountState['value']) => action(payload),
);
export type CreateDecrementBy = typeof createDecrementBy;
export type DecrementByAction = ReturnType<CreateDecrementBy>;

export const incrementType = 'count/increment';
export const createIncrement = createAction(incrementType);
export type CreateIncrement = typeof createIncrement;
export type IncrementAction = ReturnType<CreateIncrement>;

export type CountAction =
  | GetCountAction
  | SetCountAction
  | IncrementAction
  | DecrementByAction;

export default (state = initialCountState, action: CountAction) => {
  switch (action.type) {
    case getCountType:
      return { ...state, isLoading: true };
    case setCountType:
      return {
        value: action.payload,
        isLoading: false,
      };
    case incrementType:
      return { ...state, isLoading: true };
    case decrementByType:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
