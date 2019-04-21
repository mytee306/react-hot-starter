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

export default (type = initialType, action: SetPaletteTypeAction) => {
  switch (action.type) {
    case setPaletteTypeActionType:
      return action.payload;

    default:
      return type;
  }
};
