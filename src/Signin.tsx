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
import { State, selectAuthLoadingFlag } from './store/reducer';

export interface SigninProps {
  signIn: CreateSignin;
  authLoading: boolean;
}

const Signin: FC<SigninProps> = ({ signIn, authLoading }) => (
  <Card>
    <CardContent>
      <Typography variant="h2">Welcome</Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" onClick={() => signIn()} loading={authLoading}>
        Signin
      </Button>
    </CardActions>
  </Card>
);

export default connect(
  (state: State) => ({ authLoading: selectAuthLoadingFlag(state) }),
  { signIn: createSignin },
)(Signin);
