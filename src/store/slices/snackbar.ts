import { createSlice, PayloadAction } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';

export interface SnackbarState {
  message: string;
  duration?: number;
}

const initialState: SnackbarState = {
  message: '',
  duration: 0,
};

export type SetSnackbarAction = PayloadAction<SnackbarState>;

export type CreateSetSnackbar = SliceActionCreator<SnackbarState>;

export type ResetSnackbarAction = PayloadAction<SnackbarState>;

export type CreateResetSnackbar = SliceActionCreator<SnackbarState>;

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
