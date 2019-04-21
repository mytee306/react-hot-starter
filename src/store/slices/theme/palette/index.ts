import { Palette } from '@material-ui/core/styles/createPalette';
import { combineReducers } from 'redux';
import type from './type';

export default combineReducers<Palette>({
  type,
} as any);
