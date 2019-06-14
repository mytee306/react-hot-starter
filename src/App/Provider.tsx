import React, { SFC } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../store';

const store = configureStore();

export interface ProviderProps {}

const Provider: SFC<ProviderProps> = ({ children }) => (
  <Router>
    <StoreProvider store={store}>{children}</StoreProvider>
  </Router>
);

export default Provider;
