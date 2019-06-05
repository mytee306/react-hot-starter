import { UserInfo } from 'firebase';
import { combineReducers } from 'redux';
import { createAction, createReducer } from 'redux-starter-kit';
import { prefixActionType } from '../../../utils/prefixActionType';

const prefixWithAccount = prefixActionType('account');

export type Account = UserInfo;

export const initialAccount: Account = {
  displayName: '',
  email: '',
  uid: '',
  photoURL: '',
  phoneNumber: '',
  providerId: '',
};

export const createGetAccount = createAction(prefixWithAccount('get'));

export const createAuthStateChange = createAction<Account>(
  prefixWithAccount('auth state change'),
);

export type AuthStateChange = ReturnType<typeof createAuthStateChange>;

export const createSetAccount = createAction<Account>(prefixWithAccount('set'));

export type SetAccountAction = ReturnType<typeof createSetAccount>;

export const core = createReducer(initialAccount, {
  [createSetAccount.toString()]: (_, { payload }: SetAccountAction) => payload,
});

export const createSetAccountError = createAction(prefixWithAccount('error'));

export type SetAccountErrorAction = ReturnType<typeof createSetAccountError>;

export const error = createReducer('', {
  [createSetAccountError.toString()]: (_, { payload }: SetAccountErrorAction) =>
    payload,
});

const setToFalse = () => false;

export const loading = createReducer<Boolean>(false, {
  [createGetAccount.toString()]: () => true,
  [createSetAccount.toString()]: setToFalse,
  [createSetAccountError.toString()]: setToFalse,
});

export default combineReducers({
  loading,
  error,
  core,
});

export const createLogout = createAction(prefixWithAccount('logout'));
