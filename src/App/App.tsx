import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import React, { FC, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import Snackbar from '../components/Snackbar';
import Layout from '../Layout';
import { CreateSimpleAction } from '../models/actions';
import { selectSignedInFlag, selectTheme, State } from '../store/reducer';
import { createGetAuthState } from '../store/slices/auth';
import Routes from './Routes';

export interface AppProps {
  isSignedIn: ReturnType<typeof selectSignedInFlag>;
  theme: ThemeOptions;
  getAuthState: CreateSimpleAction;
}

const App: FC<AppProps> = ({ getAuthState, isSignedIn, theme }) => {
  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  return (
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
};

export default hot(module)(
  connect(
    (state: State) => ({
      theme: selectTheme(state),
      isSignedIn: selectSignedInFlag(state),
    }),
    {
      getAuthState: createGetAuthState,
    },
  )(App),
);
