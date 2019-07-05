import { PaletteType } from '@material-ui/core';
import { createAction, createReducer } from 'redux-starter-kit';
import { prefixActionType } from 'utils';

const prefixWithSlice = prefixActionType(
  prefixActionType('theme')(prefixActionType('palette')('type')),
);

export const createSetType = createAction<PaletteType>(prefixWithSlice('set'));

export type CreateSetTypeAction = typeof createSetType;

export type SetTypeAction = ReturnType<typeof createSetType>;

export const createToggleType = createAction(prefixWithSlice('toggle'));

export default createReducer<PaletteType, SetTypeAction>('light', {
  [createSetType.toString()]: (_, { payload }) => payload,
  [createToggleType.toString()]: type => (type === 'light' ? 'dark' : 'light'),
});
