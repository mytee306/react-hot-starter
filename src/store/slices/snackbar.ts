import { drop } from 'ramda';
import { createSlice } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { Optional } from 'utility-types';

export const variants = ['default', 'error', 'success', 'info'] as const;

export type Variant = typeof variants[number];

export interface SnackbarConfig {
  message: string;
  variant: Variant;
  duration?: number;
}

export interface SnackbarState {
  queue: SnackbarConfig[];
}

const initialState: SnackbarState = {
  queue: [],
};

export type CreateSetSnackbar = SliceActionCreator<SnackbarConfig>;

export type SetSnackbarAction = ReturnType<CreateSetSnackbar>;

export type CreateResetSnackbar = SliceActionCreator<SnackbarState>;

export type ResetSnackbarAction = ReturnType<CreateResetSnackbar>;

export const {
  slice,
  reducer,
  actions: { set, reset: createResetSnackbar, close: createCloseSnackbar },
  selectors: { getSnackbar: selectSnackbar },
} = createSlice({
  slice: 'snackbar',
  initialState,
  reducers: {
    set: ({ queue }, { payload }: SetSnackbarAction) => ({
      queue: queue.concat(payload),
    }),
    close: ({ queue }) => ({ queue: drop(1, queue) }),
    reset: () => initialState,
  },
});

export const createSetSnackbar = ({
  variant = 'default',
  ...snackbar
}: Optional<SnackbarConfig, 'variant'>) => set({ ...snackbar, variant });

export default reducer;
