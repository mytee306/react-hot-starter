import { PaletteType } from '@material-ui/core';
import { createReducer } from 'redux-starter-kit';
import { createAction } from 'typesafe-actions';

export const setTypeType = 'theme/palette/type/set';
export const createSetType = createAction(
  setTypeType,
  action => (payload: PaletteType) => action(payload),
);
export type CreateSetType = typeof createSetType;
export type SetTypeAction = ReturnType<CreateSetType>;

export const toggleTypeType = 'theme/palette/type/toggle';
export const createToggleType = createAction(toggleTypeType);
export type CreateToggleType = typeof createToggleType;
export type ToggleTypeAction = ReturnType<CreateToggleType>;

export default createReducer<PaletteType, SetTypeAction>('light', {
  [createSetType.toString()]: (_, { payload }) => payload,
  [createToggleType.toString()]: type => (type === 'light' ? 'dark' : 'light'),
});
