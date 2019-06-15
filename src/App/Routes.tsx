import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Count from '../Count';
import Signin from '../Signin';

export interface RoutesProps {
  isSignedIn: boolean;
}

const Routes: FC<RoutesProps> = ({ isSignedIn }) => (
  <Switch>
    <Route path="/signin" component={Signin} />
    {isSignedIn ? null : <Redirect to="/signin" />}
    <Route path="/count" component={Count} />
  </Switch>
);

export default Routes;
