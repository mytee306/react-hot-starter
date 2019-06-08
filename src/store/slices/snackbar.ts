import { createSlice } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { Optional } from 'utility-types';

export const variants = ['default', 'error', 'success', 'info'] as const;

export type Variant = typeof variants[number];

export interface SnackbarState {
  message: string;
  variant: Variant;
  duration?: number;
}

const initialState: SnackbarState = {
  message: '',
  variant: 'default',
  duration: 0,
};

export type CreateSetSnackbar = SliceActionCreator<SnackbarState>;

export type SetSnackbarAction = ReturnType<CreateSetSnackbar>;

export type CreateResetSnackbar = SliceActionCreator<SnackbarState>;

export type ResetSnackbarAction = ReturnType<CreateResetSnackbar>;

export const {
  slice,
  reducer,
  actions: { set, reset: createResetSnackbar },
  selectors: { getSnackbar: selectSnackbar },
} = createSlice({
  slice: 'snackbar',
  initialState,
  reducers: {
    set: (_, { payload }: SetSnackbarAction) => payload,
    reset: () => initialState,
  },
});

export const createSetSnackbar = ({
  variant = 'default',
  ...snackbar
}: Optional<SnackbarState,'variant'>) => set({ ...snackbar, variant });

export default reducer;
