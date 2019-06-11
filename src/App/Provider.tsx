import React, { SFC } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../store';
import { init } from '../firebase';

const store = configureStore();
init();

export interface ProviderProps {}

const Provider: SFC<ProviderProps> = ({ children }) => (
  <Router>
    <StoreProvider store={store}>{children}</StoreProvider>
  </Router>
);

export default Provider;
