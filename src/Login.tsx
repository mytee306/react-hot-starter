import {
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  IconButton,
  Snackbar,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { createLogin, CreateLogin } from './store/slices/auth';

export interface LoginProps extends WithStyles {
  logIn: CreateLogin;
}

const LoginStyles = (theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing.unit,
    },
  });

const Login: FC<LoginProps> = ({ logIn, classes }) => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(true);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h2">Welcome</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={() => logIn(setMessage)}>
            Login
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={5000} // does not hide
        message={message}
        action={[
          <IconButton
            key={IconButton.displayName}
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={() => setOpen(false)}
          >
            <Close />
          </IconButton>,
        ]}
      />
    </>
  );
};
export default withStyles(LoginStyles, { withTheme: true })(
  connect(
    null,
    { logIn: createLogin },
  )(Login),
);
