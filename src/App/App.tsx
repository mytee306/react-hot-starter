import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import React, { FC } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import Layout from '../Layout';
import { selectLoggedInFlag, selectTheme, State } from '../store/reducer';
import Routes from './Routes';

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
      <Routes isLoggedIn={isLoggedIn} />
    </Layout>
  </MuiThemeProvider>
);

export default hot(module)(
  connect((state: State) => ({
    theme: selectTheme(state),
    isLoggedIn: selectLoggedInFlag(state),
  }))(App),
);
