import { combineReducers } from 'redux';
import { createAction, createReducer } from 'redux-starter-kit';
import { prefixActionType } from '../../../utils/prefixActionType';

const prefixWithSlice = prefixActionType('account');

export const createSetLoadingAction = createAction(prefixWithSlice('loading'));

export type SetLoadingAction = ReturnType<typeof createSetLoadingAction>;

export const loading = createReducer(false, {
  [createSetLoadingAction.toString()]: (_, { payload }: SetLoadingAction) =>
    payload,
});

const createSetErrorAction = createAction(prefixWithSlice('error'));

export type SetErrorAction = ReturnType<typeof createSetErrorAction>;

export const error = createReducer('', {
  [createSetErrorAction.toString()]: (_, { payload }: SetErrorAction) =>
    payload,
});

export const createSetDisplayNameAction = createAction(
  prefixWithSlice('display name'),
);

export type SetDisplayNameAction = ReturnType<
  typeof createSetDisplayNameAction
>;

export const displayName = createReducer('', {
  [createSetDisplayNameAction.toString()]: (
    _,
    { payload }: SetDisplayNameAction,
  ) => payload,
});

export const createSetEmailAction = createAction(prefixWithSlice('email'));

export type SetEmailAction = ReturnType<typeof createSetEmailAction>;

export const email = createReducer('', {
  [createSetEmailAction.toString()]: (_, { payload }: SetEmailAction) =>
    payload,
});

export const createSetUIDAction = createAction(prefixWithSlice('uid'));

export type SetUIDAction = ReturnType<typeof createSetUIDAction>;

export const uid = createReducer('', {
  [createSetUIDAction.toString()]: (_, { payload }: SetUIDAction) => payload,
});

export const createSetPhotoURLAction = createAction(
  prefixWithSlice('photo URL'),
);

export type SetPhotoURLAction = ReturnType<typeof createSetUIDAction>;
export const photoURL = createReducer('', {
  [createSetPhotoURLAction.toString()]: (_, { payload }: SetPhotoURLAction) =>
    payload,
});

export default combineReducers({
  loading,
  error,
  displayName,
  uid,
  photoURL,
});
