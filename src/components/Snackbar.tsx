import {
  colors,
  createStyles,
  Snackbar as MaterialSnackbar,
  SnackbarContent,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Close } from '@material-ui/icons';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { CreateSimpleAction } from '../models/actions';
import { selectSnackbar, State } from '../store/reducer';
import {
  createResetSnackbar,
  SnackbarState,
  Variant,
} from '../store/slices/snackbar';
import IconButton from './IconButton';

export interface SnackbarProps extends WithStyles, SnackbarState {
  open: ReturnType<typeof selectSnackbar>['open'];
  resetSnackbar: CreateSimpleAction;
}

type GetVariants = (theme: Theme) => { [key in Variant]: CSSProperties };

const getVariants: GetVariants = ({ palette }) => ({
  default: {},
  error: {
    backgroundColor: palette.error.main,
  },
  success: {
    backgroundColor: colors.green[600],
  },
  info: {
    backgroundColor: palette.primary.light,
  },
});

const snackbarStyles = (theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing.unit,
    },
    ...getVariants(theme),
  });

const Snackbar: FC<SnackbarProps> = ({
  classes,
  open,
  message,
  duration,
  resetSnackbar,
  variant,
}) => {
  useEffect(() => {
    if (duration) {
      setTimeout(
        () => {
          resetSnackbar();
        },
        duration,
        resetSnackbar,
      );
    }
  }, [duration, resetSnackbar]);

  return (
    <MaterialSnackbar open={open}>
      <SnackbarContent
        message={message}
        className={classes[variant]}
        action={[
          <IconButton
            key={uuid()}
            aria-label="Close"
            className={classes.close}
            onClick={() => resetSnackbar()}
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
    { resetSnackbar: createResetSnackbar },
  )(Snackbar),
);
