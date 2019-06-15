import { User as FirebaseUser, UserInfo } from 'firebase/app';
import { combineReducers } from 'redux';
import { createAction, createReducer } from 'redux-starter-kit';
import { prefixActionType } from '../../../utils';

const prefix = prefixActionType('auth');

export type User = Omit<UserInfo, 'providerId'>;

export const initialUser: User = {
  displayName: 'John Doe',
  email: 'john.doe@example.com',
  uid: '',
  photoURL: '',
  phoneNumber: '541-012-3456',
};

export const createSignin = createAction(prefix('signin'));

export type CreateSignin = typeof createSignin;

export const createSignout = createAction(prefix('signout'));

const prefixWithAuthState = prefixActionType(prefix('state'));

export const createGetAuthState = createAction(prefixWithAuthState('get'));

export const authStateChangeType = prefixWithAuthState('change');

export const createAuthStateChange = (user: FirebaseUser) =>
  createAction(authStateChangeType)(user ? (user.toJSON() as User) : null);

export type AuthStateChangeAction = ReturnType<typeof createAuthStateChange>;

export const createSetUser = createAction<User>(prefix('set'));

export type SetUserAction = ReturnType<typeof createSetUser>;

export const user = createReducer(initialUser, {
  [createSetUser.toString()]: (_, { payload }: SetUserAction) => payload,
});

export const createSetAuthError = createAction<string>(prefix('error'));

export type SetAuthErrorAction = ReturnType<typeof createSetAuthError>;

export const error = createReducer('', {
  [createSetAuthError.toString()]: (_, { payload }: SetAuthErrorAction) =>
    payload,
});

const setToTrue = () => true;
const setToFalse = () => false;

export const isLoading = createReducer<boolean>(false, {
  [createGetAuthState.toString()]: setToTrue,
  [createSignin.toString()]: setToTrue,
  [createSignout.toString()]: setToTrue,
  [createSetUser.toString()]: setToFalse,
  [createSetAuthError.toString()]: setToFalse,
});

export default combineReducers({
  isLoading,
  error,
  user,
});
