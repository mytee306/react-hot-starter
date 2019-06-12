import React, { useEffect, FC } from 'react';
import {
  IconButton,
  Snackbar as MaterialSnackbar,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  colors,
  SnackbarContent,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { State, selectSnackbar } from '../store/reducer';
import { CreateSimpleAction } from '../models/actions';
import {
  createResetSnackbar,
  SnackbarState,
  Variant,
} from '../store/slices/snackbar';

export interface SnackbarProps extends WithStyles, SnackbarState {
  open: boolean;
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
            key={IconButton.displayName}
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
