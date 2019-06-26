import dashify from 'dashify';
import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NotFound from '../components/NotFound';
import Count from '../Count';
import Images from '../Images';
import Signin from '../Signin';
import { Store } from '../Store';

export interface RoutesProps {
  isSignedIn: boolean;
}

const pathnames = ['store', 'signin', 'count', 'images'] as const;

export const rootPaths = {
  ...pathnames.reduce(
    (paths, path) => ({ ...paths, [path]: `/${dashify(path)}` }),
    {} as Record<typeof pathnames[number], string>,
  ),
  dashboard: '/',
};

const Dashboard: FC = () => <>Dashboard</>;

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
