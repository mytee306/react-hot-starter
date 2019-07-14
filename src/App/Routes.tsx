import { Switch } from 'components';
import { absoluteRootPaths } from 'Layout/Nav';
import { Count, Dashboard, Images, List, Signin, Store } from 'pages';
import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';

export interface RoutesProps {
  isSignedIn: boolean;
}

const Routes: FC<RoutesProps> = ({ isSignedIn }) => (
  <Switch>
    {isSignedIn ? null : <Route component={Signin} />}
    <Route
      path={absoluteRootPaths.signin}
      render={() => <Redirect to={absoluteRootPaths.dashboard} />}
    />
    <Route exact path={absoluteRootPaths.dashboard} component={Dashboard} />
    <Route path={absoluteRootPaths.count} component={Count} />
    <Route path={absoluteRootPaths.images} component={Images} />
    <Route path={absoluteRootPaths.store} component={Store} />
    <Route path={absoluteRootPaths.list} component={List} />
    {/* {absoluteRootPathnames
      .filter(path => path === absoluteRootPaths.dashboard)
      .map((path, i) => (
        <Route
          key={path}
          path={path}
          component={pages[textRootPathnames[i] as any]}
        />
      ))} */}
  </Switch>
);

export default Routes;
