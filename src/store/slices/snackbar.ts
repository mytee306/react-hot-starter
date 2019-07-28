import { drop, isEmpty } from 'ramda';
import { createSlice } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { Optional } from 'utility-types';
import { createDeepSelector } from 'utils';

export const snackbarSliceName = 'snackbar';

export const variants = ['default', 'error', 'success', 'info'] as const;

export type Variant = typeof variants[number];

export interface SimpleSnackbarConfig {
  message: string;
  duration?: number;
}

export interface SnackbarConfig extends SimpleSnackbarConfig {
  variant: Variant;
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

const snackbarSlice = createSlice({
  slice: snackbarSliceName,
  initialState,
  reducers: {
    set: ({ queue }, { payload }: SetSnackbarAction) => ({
      queue: queue.concat(payload),
    }),
    close: ({ queue }) => ({ queue: drop(1, queue) }),
    reset: () => initialState,
  },
});

export const {
  actions: { reset: createResetSnackbar, close: createCloseSnackbar },
  selectors: { getSnackbar: selectSnackbarState },
} = snackbarSlice;

export default snackbarSlice.reducer;

const {
  actions: { set },
} = snackbarSlice;

export const createSetSnackbar = ({
  variant = 'default',
  ...snackbar
}: Optional<SnackbarConfig, 'variant'>) => set({ ...snackbar, variant });

export const createSetErrorSnackbar = ({ ...snackbar }: SimpleSnackbarConfig) =>
  set({ ...snackbar, variant: 'error' });

export const createSetSuccessSnackbar = ({
  ...snackbar
}: SimpleSnackbarConfig) => set({ ...snackbar, variant: 'success' });

export const selectSnackbar = createDeepSelector(
  selectSnackbarState,
  ({ queue }) => {
    const isQueueEmpty = isEmpty(queue);

    return {
      queue: isQueueEmpty
        ? queue.concat({ message: '', variant: 'default' })
        : queue,
      open: !isQueueEmpty,
    };
  },
);
