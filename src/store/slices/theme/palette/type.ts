import { PaletteType } from '@material-ui/core';
import { Action } from 'redux';

const initialType: PaletteType = 'light';

export const setPaletteTypeActionType = 'Theme -> Palette -> Type -> Set';

export type SetPaletteTypeAction = Action<typeof setPaletteTypeActionType> & {
  payload: PaletteType;
};

export type SetPaletteTypeActionCreator = (
  payload: PaletteType,
) => SetPaletteTypeAction;
export const setPaletteTypeActionCreator: SetPaletteTypeActionCreator = payload => ({
  type: setPaletteTypeActionType,
  payload,
});

export const togglePaletteTypeActionType = 'Theme -> Palette -> Type -> Toggle';

export type TogglePaletteTypeAction = Action<
  typeof togglePaletteTypeActionType
>;

export type TogglePaletteTypeActionCreator = () => TogglePaletteTypeAction;
export const togglePaletteTypeActionCreator: TogglePaletteTypeActionCreator = () => ({
  type: togglePaletteTypeActionType,
});

export type PaletteTypeAction = SetPaletteTypeAction | TogglePaletteTypeAction;

export default (type: PaletteType = initialType, action: PaletteTypeAction) => {
  switch (action.type) {
    case setPaletteTypeActionType:
      return action.payload;

    case togglePaletteTypeActionType:
      return type === 'light' ? 'dark' : 'light';

    default:
      return type;
  }
};
