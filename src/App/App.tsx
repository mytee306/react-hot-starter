import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import React, { FC } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import Layout from '../Layout';
import { selectSignedInFlag, selectTheme, State } from '../store/reducer';
import Routes from './Routes';
import Snackbar from '../components/Snackbar';

export interface AppProps {
  isSignedIn: boolean;
  theme: ThemeOptions;
}

const App: FC<AppProps> = ({ isSignedIn, theme }) => (
  <MuiThemeProvider
    theme={createMuiTheme({
      ...theme,
      typography: {
        useNextVariants: true,
      },
    })}
  >
    <Layout isSignedIn={isSignedIn}>
      <Routes isSignedIn={isSignedIn} />
    </Layout>
    <Snackbar />
  </MuiThemeProvider>
);

export default hot(module)(
  connect((state: State) => ({
    theme: selectTheme(state),
    isSignedIn: selectSignedInFlag(state),
  }))(App),
);
