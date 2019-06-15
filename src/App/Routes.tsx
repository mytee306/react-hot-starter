import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import Count from '../Count';
import Signin from '../Signin';

export interface RoutesProps {
  isSignedIn: boolean;
}

const signinPath = '/signin';
const countPath = '/count';

const Routes: FC<RoutesProps> = ({ isSignedIn }) => (
  <Switch>
    {isSignedIn ? null : <Route component={Signin} />}
    <Route path={signinPath} component={Signin} />
    <Route path={countPath} component={Count} />
  </Switch>
);

export default Routes;
