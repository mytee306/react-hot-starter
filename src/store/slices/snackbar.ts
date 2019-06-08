import { createSlice } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';

export interface SnackbarState {
  message: string;
  duration?: number;
}

const initialState: SnackbarState = {
  message: '',
  duration: 0,
};

export type CreateSetSnackbar = SliceActionCreator<SnackbarState>;

export type SetSnackbarAction = ReturnType<CreateSetSnackbar>;

export type CreateResetSnackbar = SliceActionCreator<SnackbarState>;

export type ResetSnackbarAction = ReturnType<CreateResetSnackbar>;

export const {
  slice,
  reducer,
  actions: { set: createSetSnackbar, reset: createResetSnackbar },
  selectors: { getSnackbar: selectSnackbar },
} = createSlice({
  slice: 'snackbar',
  initialState,
  reducers: {
    set: (_, { payload }: SetSnackbarAction) => payload,
    reset: () => initialState,
  },
});

export default reducer;
