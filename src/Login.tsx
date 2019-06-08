import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { createLogin, CreateLogin } from './store/slices/auth';

export interface LoginProps {
  logIn: CreateLogin;
}

const Login: FC<LoginProps> = ({ logIn }) => (
  <Card>
    <CardContent>
      <Typography variant="h2">Welcome</Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" onClick={() => logIn()}>
        Login
      </Button>
    </CardActions>
  </Card>
);

export default connect(
  null,
  { logIn: createLogin },
)(Login);
