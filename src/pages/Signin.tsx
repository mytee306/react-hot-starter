import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Button } from 'components';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { selectAuthLoadingFlag, State } from 'store';
import { createSignin, CreateSignin } from 'store/slices';

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
