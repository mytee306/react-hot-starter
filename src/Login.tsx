import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { CreateSimpleAction } from './models/actions';
import { createGetUser } from './store/slices/user';

export interface LoginProps {
  logIn: CreateSimpleAction;
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
  { logIn: createGetUser },
)(Login);
