import {
  makeStyles,
  Snackbar as MaterialSnackbar,
  SnackbarContent,
} from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { CreateSimpleAction, EnhancedTheme } from 'models';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  createCloseSnackbar,
  selectSnackbar,
  SnackbarState,
  State,
  Variant,
} from 'store';
import IconButton from './IconButton';

const close = 'Close';

export interface SnackbarProps extends SnackbarState {
  open: ReturnType<typeof selectSnackbar>['open'];
  closeSnackbar: CreateSimpleAction;
}

type GetVariants = (theme: EnhancedTheme) => StyleRules<Variant>;

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

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(1),
  },
  ...getVariants(theme),
}));

const Snackbar: FC<SnackbarProps> = ({ open, closeSnackbar, queue }) => {
  const classes = useStyles();

  const [{ duration, message, variant }] = queue;

  useEffect(() => {
    if (duration) {
      const timeout = setTimeout(() => {
        closeSnackbar();
      }, duration);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      return () => {};
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

export default connect(
  (state: State) => selectSnackbar(state),
  { closeSnackbar: createCloseSnackbar },
)(Snackbar);
