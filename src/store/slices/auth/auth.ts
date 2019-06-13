import { User as FirebaseUser, UserInfo } from 'firebase/app';
import { combineReducers } from 'redux';
import { createAction, createReducer } from 'redux-starter-kit';
import { prefixActionType } from '../../../utils';

const prefixWithUser = prefixActionType('auth');

export type User = Omit<UserInfo, 'providerId'>;

export const initialUser: User = {
  displayName: '',
  email: '',
  uid: '',
  photoURL: '',
  phoneNumber: '',
};

export const createSignin = createAction(prefixWithUser('get'));

export type CreateSignin = typeof createSignin;

export const createSignout = createAction(prefixWithUser('signout'));

export const authStateChangeType = prefixWithUser('auth state change');

export const createAuthStateChange = (user: FirebaseUser) =>
  createAction(authStateChangeType)(user ? (user.toJSON() as User) : null);

export type AuthStateChangeAction = ReturnType<typeof createAuthStateChange>;

export const createSetUser = createAction<User>(prefixWithUser('set'));

export type SetUserAction = ReturnType<typeof createSetUser>;

export const user = createReducer(initialUser, {
  [createSetUser.toString()]: (_, { payload }: SetUserAction) => payload,
});

export const createSetAuthError = createAction<string>(prefixWithUser('error'));

export type SetAuthErrorAction = ReturnType<typeof createSetAuthError>;

export const error = createReducer('', {
  [createSetAuthError.toString()]: (_, { payload }: SetAuthErrorAction) =>
    payload,
});

const setToTrue = () => true;
const setToFalse = () => false;

export const loading = createReducer<boolean>(false, {
  [createSignin.toString()]: setToTrue,
  [createSignout.toString()]: setToTrue,
  [createSetUser.toString()]: setToFalse,
  [createSetAuthError.toString()]: setToFalse,
});

export default combineReducers({
  loading,
  error,
  user,
});
