import { combineReducers } from 'redux';
import palette, { PaletteAction } from './palette';

export default combineReducers({
  palette,
});

export type ThemeAction = PaletteAction;

export * from './palette';
