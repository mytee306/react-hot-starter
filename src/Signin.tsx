import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Button from './components/Button';
import {
  selectAuthLoadingFlag,
  selectSignedInFlag,
  State,
} from './store/reducer';
import { createSignin, CreateSignin } from './store/slices/auth';

export const signinPath = '/signin';

export interface SigninProps extends RouteComponentProps {
  signIn: CreateSignin;
  isAuthLoading: ReturnType<typeof selectAuthLoadingFlag>;
  isSignedIn: ReturnType<typeof selectSignedInFlag>;
}

const Signin: FC<SigninProps> = ({
  signIn,
  isAuthLoading,
  isSignedIn,
  history,
  location: { pathname },
}) => {
  useEffect(() => {
    if (isSignedIn) {
      if (pathname === signinPath) {
        history.push('/');
      } else {
        history.goBack();
      }
    }
  }, [isSignedIn, pathname, history]);

  return (
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
};

export default connect(
  (state: State) => ({
    isAuthLoading: selectAuthLoadingFlag(state),
    isSignedIn: selectSignedInFlag(state),
  }),
  { signIn: createSignin },
)(Signin);
