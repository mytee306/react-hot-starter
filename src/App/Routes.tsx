import { useMediaQuery, WithTheme, withTheme } from '@material-ui/core';
import { Switch } from 'components';
import { absoluteRootPaths } from 'Layout/Nav';
import { Count, Dashboard, Images, List, Signin, Store } from 'pages';
import Canvas from 'pages/Canvas';
import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { Redirect, Route } from 'react-router-dom';

export interface RoutesProps extends WithTheme {
  isSignedIn: boolean;
}

const Routes: FC<RoutesProps> = ({ isSignedIn, theme }) => {
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <DndProvider backend={isMediumScreen ? HTML5Backend : TouchBackend}>
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
        <Route path={absoluteRootPaths.canvas} component={Canvas} />
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
    </DndProvider>
  );
};

export default withTheme(Routes);
