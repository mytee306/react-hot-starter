import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import React, { SFC } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../store';

if (process.env.NODE_ENV === 'production') {
  LogRocket.init('7lfo0w/react-hot-starter');

  setupLogRocketReact(LogRocket);

  LogRocket.getSessionURL(sessionURL => {
    (window as any).drift.track('LogRocket', { sessionURL });
  });
}

const store = configureStore();

export interface ProviderProps {}

const Provider: SFC<ProviderProps> = ({ children }) => (
  <Router>
    <StoreProvider store={store}>{children}</StoreProvider>
  </Router>
);

export default Provider;
