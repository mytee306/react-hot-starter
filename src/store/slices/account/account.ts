import { combineReducers } from 'redux';
import { createAction, createReducer } from 'redux-starter-kit';
import { prefixActionType } from '../../../utils/prefixActionType';

const prefixWithSlice = prefixActionType('account');

export const initialAccount = {
  displayName: '',
  email: '',
  uid: '',
  photoURL: '',
};

export type Account = typeof initialAccount;

export const createGetAccount = createAction(prefixWithSlice('get'));

export const createSetAccount = createAction<Account>(
  prefixWithSlice('set'),
);

export type SetAccountAction = ReturnType<typeof createSetAccount>;

export const core = createReducer(initialAccount, {
  [createSetAccount.toString()]: (_, { payload }: SetAccountAction) =>
    payload,
});

export const createSetAccountError = createAction(prefixWithSlice('error'));

export type SetAccountErrorAction = ReturnType<
  typeof createSetAccountError
>;

export const error = createReducer('', {
  [createSetAccountError.toString()]: (
    _,
    { payload }: SetAccountErrorAction,
  ) => payload,
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
