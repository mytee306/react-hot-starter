import { UserInfo } from 'firebase';
import { combineReducers } from 'redux';
import { createAction, createReducer } from 'redux-starter-kit';
import { prefixActionType } from '../../../utils/prefixActionType';

const prefixWithUser = prefixActionType('auth');

export type User = UserInfo;

export const initialUser: User = {
  displayName: '',
  email: '',
  uid: '',
  photoURL: '',
  phoneNumber: '',
  providerId: '',
};

export const createLogin = createAction(prefixWithUser('get'));

export const createAuthStateChange = createAction<User>(
  prefixWithUser('auth state change'),
);

export type AuthStateChange = ReturnType<typeof createAuthStateChange>;

export const createSetUser = createAction<User>(prefixWithUser('set'));

export type SetUserAction = ReturnType<typeof createSetUser>;

export const core = createReducer(initialUser, {
  [createSetUser.toString()]: (_, { payload }: SetUserAction) => payload,
});

export const createSetAuthError = createAction(prefixWithUser('error'));

export type SetAuthErrorAction = ReturnType<typeof createSetAuthError>;

export const error = createReducer('', {
  [createSetAuthError.toString()]: (_, { payload }: SetAuthErrorAction) =>
    payload,
});

const setToFalse = () => false;

export const loading = createReducer<Boolean>(false, {
  [createLogin.toString()]: () => true,
  [createSetUser.toString()]: setToFalse,
  [createSetAuthError.toString()]: setToFalse,
});

export default combineReducers({
  loading,
  error,
  core,
});

export const createLogout = createAction(prefixWithUser('logout'));
