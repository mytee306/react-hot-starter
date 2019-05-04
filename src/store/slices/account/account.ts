import { combineReducers } from 'redux';
import { createAction, createReducer } from 'redux-starter-kit';
import { prefixActionType } from '../../../utils/prefixActionType';

const prefixWithSlice = prefixActionType('account');

const initialAccount = {
  displayName: '',
  email: '',
  uid: '',
  photoURL: '',
};

export type Account = typeof initialAccount;

export const createGetAccountAction = createAction(prefixWithSlice('get'));

export const createSetAccountAction = createAction<Account>(
  prefixWithSlice('set'),
);

export type SetAccountAction = ReturnType<typeof createSetAccountAction>;

export const core = createReducer(initialAccount, {
  [createSetAccountAction.toString()]: (_, { payload }: SetAccountAction) =>
    payload,
});

const createSetAccountErrorAction = createAction(prefixWithSlice('error'));

export type SetAccountErrorAction = ReturnType<
  typeof createSetAccountErrorAction
>;

export const error = createReducer('', {
  [createSetAccountErrorAction.toString()]: (
    _,
    { payload }: SetAccountErrorAction,
  ) => payload,
});

export const loading = createReducer<Boolean>(false, {
  [createGetAccountAction.toString()]: () => true,
  [createSetAccountAction.toString()]: () => false,
  [createSetAccountErrorAction.toString()]: () => false,
});

export default combineReducers({
  loading,
  error,
  core,
});
