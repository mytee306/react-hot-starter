/* eslint-disable consistent-return */

import {
  createStyles,
  Snackbar as MaterialSnackbar,
  SnackbarContent,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Close } from '@material-ui/icons';
import { CreateSimpleAction, EnhancedTheme } from 'models';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectSnackbar, State } from 'store';
import { createCloseSnackbar, SnackbarState, Variant } from 'store/slices';
import IconButton from './IconButton';

const close = 'Close';

export interface SnackbarProps extends WithStyles, SnackbarState {
  open: ReturnType<typeof selectSnackbar>['open'];
  closeSnackbar: CreateSimpleAction;
}

type GetVariants = (theme: EnhancedTheme) => Record<Variant, CSSProperties>;

const getVariants: GetVariants = ({ palette, colors }) => ({
  default: {},
  error: {
    backgroundColor: palette.error.main,
  },
  success: {
    backgroundColor: colors.success.dark,
  },
  info: {
    backgroundColor: palette.primary.light,
  },
});

const snackbarStyles = (theme: EnhancedTheme) =>
  createStyles({
    close: {
      padding: theme.spacing(1),
    },
    ...getVariants(theme),
  });

const Snackbar: FC<SnackbarProps> = ({
  classes,
  open,
  closeSnackbar,
  queue,
}) => {
  const [{ duration, message, variant }] = queue;

  useEffect(() => {
    if (duration) {
      const timeout = setTimeout(() => {
        closeSnackbar();
      }, duration);

      return () => {
        clearTimeout(timeout);
      };
    }
  });

  return (
    <MaterialSnackbar open={open}>
      <SnackbarContent
        message={message}
        className={classes[variant]}
        action={[
          <IconButton
            key={close}
            aria-label={close}
            className={classes.close}
            onClick={() => closeSnackbar()}
          >
            <Close />
          </IconButton>,
        ]}
      />
    </MaterialSnackbar>
  );
};

export default withStyles(snackbarStyles, { withTheme: true })(
  connect(
    (state: State) => selectSnackbar(state),
    { closeSnackbar: createCloseSnackbar },
  )(Snackbar),
);
