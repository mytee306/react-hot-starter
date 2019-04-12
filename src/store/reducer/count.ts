import { CountAction, CountActionTypes, DecrementBy } from '../actions/count';

export type Count = number;

export const initialState: Count = 0;

export default (state = initialState, action: CountAction) => {
  switch (action.type) {
    case CountActionTypes.Increment:
      return state + 1;
    case CountActionTypes.DecrementBy:
      return state - (action as DecrementBy).payload;
    default:
      return state;
  }
};
