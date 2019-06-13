import { combineEpics } from 'redux-observable';
import auth from './auth';
import count from './count';

export default combineEpics(...auth, ...count);
