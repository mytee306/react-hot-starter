import { Switch } from 'components';
import { kebabCase } from 'lodash';
import { Count, Dashboard, Images, Signin, Store } from 'pages';
import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { makeAbsolute } from 'utils';

const pathnames = ['signin', 'dashboard', 'count', 'images', 'store'] as const;

export const rootPaths = {
  ...pathnames.reduce(
    (paths, path) => ({ ...paths, [path]: makeAbsolute(kebabCase(path)) }),
    {} as Record<typeof pathnames[number], string>,
  ),
  dashboard: '/',
};

export interface RoutesProps {
  isSignedIn: boolean;
}

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
  </Switch>
);

export default Routes;
