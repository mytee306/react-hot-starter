import { combineReducers } from 'redux';
import { PaletteTypeAction, type } from './type';

export default combineReducers({
  type,
});

export type PaletteAction = PaletteTypeAction;

export * from './type';
