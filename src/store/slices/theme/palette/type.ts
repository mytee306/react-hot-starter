import { PaletteType } from '@material-ui/core';
import { createAction, createReducer } from 'redux-starter-kit';

export const createSetTypeAction = createAction<PaletteType>(
  'theme -> palette -> type -> set',
);

export type CreateSetTypeAction = typeof createSetTypeAction;

export type SetTypeAction = ReturnType<typeof createSetTypeAction>;

export const createToggleTypeAction = createAction('theme -> palette -> type -> toggle');

export default createReducer<PaletteType, SetTypeAction>('light', {
  [createSetTypeAction.toString()]: (_, { payload }) => payload,
  [createToggleTypeAction.toString()]: type =>
    type === 'light' ? 'dark' : 'light',
});
