import { PaletteType } from '@material-ui/core';
import { createAction, createReducer } from 'redux-starter-kit';
import { prefixActionType } from '../../../../utils/prefixActionType';

const prefixWithSlice = prefixActionType(
  prefixActionType('theme')(prefixActionType('palette')('type')),
);

export const createSetTypeAction = createAction<PaletteType>(
  prefixWithSlice('set'),
);

export type CreateSetTypeAction = typeof createSetTypeAction;

export type SetTypeAction = ReturnType<typeof createSetTypeAction>;

export const createToggleTypeAction = createAction(prefixWithSlice('toggle'));

export default createReducer<PaletteType, SetTypeAction>('light', {
  [createSetTypeAction.toString()]: (_, { payload }) => payload,
  [createToggleTypeAction.toString()]: type =>
    type === 'light' ? 'dark' : 'light',
});
