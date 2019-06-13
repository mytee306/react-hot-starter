import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from './components/Button';
import {
  selectAuthLoadingFlag,
  selectSignedInFlag,
  State,
} from './store/reducer';
import { createSignin, CreateSignin } from './store/slices/auth';

export interface SigninProps {
  signIn: CreateSignin;
  authLoading: boolean;
  isSignedIn: boolean;
}

const Signin: FC<SigninProps> = ({ signIn, authLoading, isSignedIn }) => (
  <>
    {isSignedIn && <Redirect to="/" />}
    <Card>
      <CardContent>
        <Typography variant="h2">Welcome</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={() => signIn()}
          loading={authLoading}
        >
          Signin
        </Button>
      </CardActions>
    </Card>
  </>
);

export default connect(
  (state: State) => ({
    authLoading: selectAuthLoadingFlag(state),
    isSignedIn: selectSignedInFlag(state),
  }),
  { signIn: createSignin },
)(Signin);
