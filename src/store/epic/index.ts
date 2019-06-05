import { combineEpics } from 'redux-observable';
import user from './user';

export default combineEpics(...user);
