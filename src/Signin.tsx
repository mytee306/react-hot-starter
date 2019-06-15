import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import Button from './components/Button';
import { selectAuthLoadingFlag, State } from './store/reducer';
import { createSignin, CreateSignin } from './store/slices/auth';

export interface SigninProps {
  signIn: CreateSignin;
  isAuthLoading: ReturnType<typeof selectAuthLoadingFlag>;
}

const Signin: FC<SigninProps> = ({ signIn, isAuthLoading }) => (
  <Card>
    <CardContent>
      <Typography variant="h2">Welcome</Typography>
    </CardContent>
    <CardActions>
      <Button
        variant="contained"
        onClick={() => signIn()}
        isLoading={isAuthLoading}
      >
        Signin
      </Button>
    </CardActions>
  </Card>
);

export default connect(
  (state: State) => ({
    isAuthLoading: selectAuthLoadingFlag(state),
  }),
  { signIn: createSignin },
)(Signin);
