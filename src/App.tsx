import {
  createMuiTheme,
  Divider,
  MuiThemeProvider,
  Typography,
} from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import React, { FC } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Decrement from './Decrement';
import Increment from './Increment';
import Layout from './Layout';
import {
  selectCount,
  selectTheme,
  State,
  selectLoggedInFlag,
} from './store/reducer';
import {
  Count,
  createDecrementByAction,
  createIncrementAction,
  CreateDecrementByAction,
} from './store/slices/count';
import Login from './Login';
import { CreateSimpleAction } from './models/actions';

export interface AppProps {
  isLoggedIn: boolean;
  count: Count;
  increment: CreateSimpleAction;
  decrementBy: CreateDecrementByAction;
  theme: ThemeOptions;
}

const App: FC<AppProps> = ({
  isLoggedIn,
  count,
  increment,
  decrementBy,
  theme,
}) => (
  <MuiThemeProvider
    theme={createMuiTheme({
      ...theme,
      typography: {
        useNextVariants: true,
      },
    })}
  >
    <Layout isLoggedIn={isLoggedIn}>
      <Typography variant="h1">Count: {count}</Typography>
      <br />
      <Divider />
      <br />
      <Switch>
        <Route path="/login" component={Login} />
        {isLoggedIn ? null : <Redirect to="/login" />}
        <Route
          path="/increment"
          component={() => <Increment increment={increment} />}
        />
        <Route
          path="/decrement"
          component={() => <Decrement decrementBy={decrementBy} />}
        />
      </Switch>
    </Layout>
  </MuiThemeProvider>
);

export const mapStateToProps = (state: State) => ({
  count: selectCount(state),
  theme: selectTheme(state),
  isLoggedIn: selectLoggedInFlag(state),
});

export const mapDispatchToProps = {
  increment: createIncrementAction,
  decrementBy: createDecrementByAction,
};

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
