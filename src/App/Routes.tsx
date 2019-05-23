import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Counter from '../Counter';
import Login from '../Login';

export interface RoutesProps {
  isLoggedIn: boolean;
}

const Routes: FC<RoutesProps> = ({ isLoggedIn }) => (
  <Switch>
    <Route path="/login" component={Login} />
    {isLoggedIn ? null : <Redirect to="/login" />}
    <Route path="/count" component={Counter} />
  </Switch>
);

export default Routes;
