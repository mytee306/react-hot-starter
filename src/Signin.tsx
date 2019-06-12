import {
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { createSignin, CreateSignin } from './store/slices/auth';
import Button from './components/Button';

export interface SigninProps {
  signIn: CreateSignin;
}

const Signin: FC<SigninProps> = ({ signIn }) => (
  <Card>
    <CardContent>
      <Typography variant="h2">Welcome</Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" onClick={() => signIn()}>
        Signin
      </Button>
    </CardActions>
  </Card>
);

export default connect(
  null,
  { signIn: createSignin },
)(Signin);
