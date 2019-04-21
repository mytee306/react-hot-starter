export type Count = number;

export const initialCount = 0;

export const incrementActionType = 'Count -> Increment';

export type IncrementAction = {
  type: typeof incrementActionType;
};

export type IncrementActionCreator = () => IncrementAction;

export const increment: IncrementActionCreator = () => ({
  type: incrementActionType,
});

export const decrementByActionType = 'Count -> Decrement';

export type DecrementByAction = {
  type: typeof decrementByActionType;
  payload: Count;
};

export type DecrementByActionCreator = (payload: Count) => DecrementByAction;

export const decrementBy: DecrementByActionCreator = payload => ({
  type: decrementByActionType,
  payload,
});

export type CountAction = IncrementAction | DecrementByAction;

export type CountActionCreator =
  | IncrementActionCreator
  | DecrementByActionCreator;

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
