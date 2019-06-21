import { colors, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/styles';
import React, { FC, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import Snackbar from '../components/Snackbar';
import Layout from '../Layout';
import { WithColors } from '../models';
import { CreateSimpleAction } from '../models/actions';
import { selectSignedInFlag, selectTheme, State } from '../store/reducer';
import { createGetAuthState } from '../store/slices/auth';
import Routes from './Routes';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme extends WithColors {}
  interface ThemeOptions extends WithColors {}
}

export interface AppProps {
  isSignedIn: ReturnType<typeof selectSignedInFlag>;
  themeOptions: ThemeOptions;
  getAuthState: CreateSimpleAction;
}

const App: FC<AppProps> = ({ getAuthState, isSignedIn, themeOptions }) => {
  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  const theme = createMuiTheme({
    ...themeOptions,
    colors: { success: colors.green[600] },
    typography: {
      useNextVariants: true,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <Layout isSignedIn={isSignedIn}>
          <Routes isSignedIn={isSignedIn} />
        </Layout>
        <Snackbar />
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

export default hot(module)(
  connect(
    (state: State) => ({
      themeOptions: selectTheme(state),
      isSignedIn: selectSignedInFlag(state),
    }),
    {
      getAuthState: createGetAuthState,
    },
  )(App),
);
