export type Count = number;

export const initialCount = 0;

export const incrementActionType = 'Count -> Increment';

export type IncrementAction = {
  type: typeof incrementActionType;
};

export type CreateIncrementAction = () => IncrementAction;

export const createIncrementAction: CreateIncrementAction = () => ({
  type: incrementActionType,
});

export const decrementByActionType = 'Count -> Decrement';

export type DecrementByAction = {
  type: typeof decrementByActionType;
  payload: Count;
};

export type CreateDecrementByAction = (payload: Count) => DecrementByAction;

export const createDecrementByAction: CreateDecrementByAction = payload => ({
  type: decrementByActionType,
  payload,
});

export type CountAction = IncrementAction | DecrementByAction;

export type CountActionCreator =
  | CreateIncrementAction
  | CreateDecrementByAction;

export default (count = initialCount, action: CountAction) => {
  switch (action.type) {
    case incrementActionType:
      return count + 1;
    case decrementByActionType:
      return count - action.payload;
    default:
      return count;
  }
};
