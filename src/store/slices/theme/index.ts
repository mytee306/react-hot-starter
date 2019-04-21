import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { combineReducers } from 'redux';
import palette from './palette';

export default combineReducers<ThemeOptions>({
  palette,
} as any);
