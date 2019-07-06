import { Typography } from '@material-ui/core';
import NotFound from 'components/NotFound';
import { kebabCase } from 'lodash';
import Count from 'pages/Count';
import Images from 'pages/Images';
import Signin from 'pages/Signin';
import { Store } from 'pages/Store';
import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

export interface RoutesProps {
  isSignedIn: boolean;
}

const pathnames = ['signin', 'dashboard', 'count', 'images', 'store'] as const;

export const rootPaths = {
  ...pathnames.reduce(
    (paths, path) => ({ ...paths, [path]: `/${kebabCase(path)}` }),
    {} as Record<typeof pathnames[number], string>,
  ),
  dashboard: '/',
};

const Dashboard: FC = () => <Typography>Dashboard</Typography>;

const Routes: FC<RoutesProps> = ({ isSignedIn }) => (
  <Switch>
    {isSignedIn ? null : <Route component={Signin} />}
    <Route
      path={rootPaths.signin}
      render={() => <Redirect to={rootPaths.dashboard} />}
    />
    <Route exact path={rootPaths.dashboard} component={Dashboard} />
    <Route path={rootPaths.images} component={Images} />
    <Route path={rootPaths.count} component={Count} />
    <Route path={rootPaths.store} component={Store} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
