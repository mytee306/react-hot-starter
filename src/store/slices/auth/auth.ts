import { User as FirebaseUser, UserInfo } from 'firebase/app';
import { combineReducers } from 'redux';
import { createReducer } from 'redux-starter-kit';
import { createAction } from 'typesafe-actions';

export type User = Omit<UserInfo, 'providerId'>;

export interface AuthState {
  user: User;
  isLoading: boolean;
  error: string;
}

export const initialUser: User = {
  displayName: 'John Doe',
  email: 'john.doe@example.com',
  uid: '',
  photoURL: '',
  phoneNumber: '541-012-3456',
};

export const signinType = 'auth/signin';
export const createSignin = createAction(signinType);
export type CreateSignin = typeof createSignin;
export type SigninAction = ReturnType<CreateSignin>;

export const signoutType = 'auth/signout';
export const createSignout = createAction(signoutType);
export type CreateSignout = typeof createSignout;
export type SignoutAction = ReturnType<CreateSignout>;

export const getAuthStateType = 'auth/state/get';
export const createGetAuthState = createAction(getAuthStateType);
export type CreateGetAuthState = typeof createGetAuthState;
export type GetAuthStateAction = ReturnType<CreateGetAuthState>;

export const authStateChangeType = 'auth/state/change';
export const createAuthStateChange = createAction(
  authStateChangeType,
  action => (user: FirebaseUser) =>
    action(user ? (user.toJSON() as User) : null),
);
export type CreateAuthStateChange = typeof createAuthStateChange;
export type AuthStateChangeAction = ReturnType<CreateAuthStateChange>;

export const setUserType = 'auth/set';
export const createSetUser = createAction(
  setUserType,
  action => (payload: User) => action(payload),
);
export type CreateSetUser = typeof createSetUser;
export type SetUserAction = ReturnType<CreateSetUser>;

export const user = createReducer<User, SetUserAction>(initialUser, {
  [setUserType]: (_, { payload }) => payload,
});

export const setAuthErrorType = 'auth/error';
export const createSetAuthError = createAction(
  setAuthErrorType,
  action => (payload: string) => action(payload),
);
export type CreateSetAuthError = typeof createSetAuthError;
export type SetAuthErrorAction = ReturnType<CreateSetAuthError>;

export const error = createReducer<AuthState['error'], SetAuthErrorAction>('', {
  [setAuthErrorType]: (_, { payload }) => payload,
});

const setToTrue = () => true;
const setToFalse = () => false;

type LoadingSettingAction =
  | GetAuthStateAction
  | SigninAction
  | SignoutAction
  | SetUserAction
  | SetAuthErrorAction;

export const isLoading = createReducer<
  AuthState['isLoading'],
  LoadingSettingAction
>(false, {
  [getAuthStateType]: setToTrue,
  [signinType]: setToTrue,
  [signoutType]: setToTrue,
  [setUserType]: setToFalse,
  [setAuthErrorType]: setToFalse,
});

export default combineReducers({
  isLoading,
  error,
  user,
});

export type AuthAction = LoadingSettingAction | AuthStateChangeAction;
