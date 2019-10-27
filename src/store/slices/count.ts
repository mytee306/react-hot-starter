import { Reducer } from 'redux';
import { ActionType, createAsyncAction, getType } from 'typesafe-actions';

export const initialCountState = {
  value: 0,
  isLoading: false,
  error: '',
};

export type CountState = typeof initialCountState;

export const getCountAsync = createAsyncAction(
  'count/get/request',
  'count/get/success',
  'count/get/failure',
)<void, CountState['value'], CountState['error']>();
export type CountGetAsync = ActionType<typeof getCountAsync>;

export const setCountAsync = createAsyncAction(
  'count/set/request',
  'count/set/success',
  'count/set/failure',
)<CountState['value'], CountState['value'], CountState['error']>();
export type CountSetAsync = ActionType<typeof setCountAsync>;

export const incrementCountAsync = createAsyncAction(
  'count/increment/request',
  'count/increment/success',
  'count/increment/failure',
)<void, CountState['value'], CountState['error']>();
export type CountIncrementAsync = ActionType<typeof incrementCountAsync>;

export type CountAction = CountGetAsync | CountSetAsync | CountIncrementAsync;

export const count: Reducer<CountState, CountAction> = (
  state = initialCountState,
  action,
) => {
  switch (action.type) {
    case getType(getCountAsync.request):
    case getType(setCountAsync.request):
    case getType(incrementCountAsync.request):
      return { ...state, isLoading: true };
    case getType(getCountAsync.success):
    case getType(setCountAsync.success):
    case getType(incrementCountAsync.success):
      return {
        ...state,
        value: action.payload,
        isLoading: false,
      };
    case getType(getCountAsync.failure):
    case getType(setCountAsync.failure):
    case getType(incrementCountAsync.failure):
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
