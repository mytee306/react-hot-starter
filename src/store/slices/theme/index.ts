import { combineReducers } from 'redux';
import palette, { PaletteAction, PaletteState } from './palette';

export default combineReducers({
  palette,
});

export interface ThemeState {
  palette: PaletteState;
}

export type ThemeAction = PaletteAction;

export * from './palette';
