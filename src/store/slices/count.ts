import { Reducer } from 'redux';
import { ActionType, createAsyncAction } from 'typesafe-actions';

export const initialCountState = {
  value: 0,
  isLoading: false,
  error: '',
};

export type CountState = typeof initialCountState;

export const countGetRequest = 'count/get/request';
export const countGetSuccess = 'count/get/success';
export const countGetFailure = 'count/get/failure';
export const createGetCountAsync = createAsyncAction(
  countGetRequest,
  countGetSuccess,
  countGetFailure,
)<void, CountState['value'], CountState['error']>();
export type CountGetAsync = ActionType<typeof createGetCountAsync>;

export const countSetRequest = 'count/set/request';
export const countSetSuccess = 'count/set/success';
export const countSetFailure = 'count/set/failure';
export const createSetCountAsync = createAsyncAction(
  countSetRequest,
  countSetSuccess,
  countSetFailure,
)<CountState['value'], CountState['value'], CountState['error']>();
export type CountSetAsync = ActionType<typeof createSetCountAsync>;

export const countIncrementRequest = 'count/increment/request';
export const createIncrementCountAsync = createAsyncAction(
  countIncrementRequest,
  countSetSuccess,
  countSetFailure,
)<void, CountState['value'], CountState['error']>();
export type CountIncrementAsync = ActionType<typeof createIncrementCountAsync>;

export type CountAction = CountGetAsync | CountSetAsync | CountIncrementAsync;

export const count: Reducer<CountState, CountAction> = (
  state = initialCountState,
  action,
) => {
  switch (action.type) {
    case countGetRequest:
    case countSetRequest:
    case countIncrementRequest:
      return { ...state, isLoading: true };
    case countGetSuccess:
    case countSetSuccess:
      return {
        ...state,
        value: action.payload,
        isLoading: false,
      };
    case countGetFailure:
    case countSetFailure:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
