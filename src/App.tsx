import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import React, { FC } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Counter from './Counter';
import Layout from './Layout';
import Login from './Login';
import { selectLoggedInFlag, selectTheme, State } from './store/reducer';

export interface AppProps {
  isLoggedIn: boolean;
  theme: ThemeOptions;
}

const App: FC<AppProps> = ({ isLoggedIn, theme }) => (
  <MuiThemeProvider
    theme={createMuiTheme({
      ...theme,
      typography: {
        useNextVariants: true,
      },
    })}
  >
    <Layout isLoggedIn={isLoggedIn}>
      <Switch>
        <Route path="/login" component={Login} />
        {isLoggedIn ? null : <Redirect to="/login" />}
        <Route path="/count" component={Counter} />
      </Switch>
    </Layout>
  </MuiThemeProvider>
);

export default hot(module)(
  connect((state: State) => ({
    theme: selectTheme(state),
    isLoggedIn: selectLoggedInFlag(state),
  }))(App),
);
