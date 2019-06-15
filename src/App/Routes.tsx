import dashify from 'dashify';
import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Count from '../Count';
import Signin from '../Signin';

export interface RoutesProps {
  isSignedIn: boolean;
}

const pathnames = ['error', 'signin', 'count', 'imageUpload'] as const;

export const rootPaths = {
  ...pathnames.reduce(
    (paths, path) => ({ ...paths, [path]: `/${dashify(path)}` }),
    {} as { [key in typeof pathnames[number]]: string },
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
    <Route
      path={rootPaths.imageUpload}
      render={() => <input type="upload" />}
    />
    <Route path={rootPaths.count} component={Count} />
    <Route
      path={rootPaths.error}
      render={() => (
        <>
          Error{' '}
          <button type="button" onClick={() => window.location.reload()}>
            Reload
          </button>
        </>
      )}
    />
    <Route render={() => <>404</>} />
  </Switch>
);

export default Routes;
