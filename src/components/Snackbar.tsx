import React, { useEffect } from 'react';
import {
  IconButton,
  Snackbar as MaterialSnackbar,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { connect } from 'react-redux';
import { State, selectSnackbar } from '../store/reducer';
import { CreateSimpleAction } from '../models/actions';
import { createResetSnackbar, SnackbarState } from '../store/slices/snackbar';

export interface SnackbarProps extends WithStyles, SnackbarState {
  open: boolean;
  resetSnackbar: CreateSimpleAction;
}

const SnackbarStyles = (theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing.unit,
    },
  });

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  duration,
  resetSnackbar,
  classes,
}) => {
  useEffect(() => {
    if (duration) {
      setTimeout(() => {
        resetSnackbar();
      }, duration);
    }
  }, [duration]);

  return (
    <MaterialSnackbar
      open={open}
      message={message}
      action={[
        <IconButton
          key={IconButton.displayName}
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={() => resetSnackbar()}
        >
          <Close />
        </IconButton>,
      ]}
    />
  );
};

export default withStyles(SnackbarStyles, { withTheme: true })(
  connect(
    (state: State) => selectSnackbar(state),
    { resetSnackbar: createResetSnackbar },
  )(Snackbar),
);
