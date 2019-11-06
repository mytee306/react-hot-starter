import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import React, { FC } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';
import configureStore from 'store';

if (process.env.NODE_ENV === 'production') {
  LogRocket.init('7lfo0w/react-hot-starter-dev');

  setupLogRocketReact(LogRocket);

  LogRocket.getSessionURL(sessionURL => {
    (window as any).drift.track('LogRocket', { sessionURL });
  });
}

const store = configureStore();

export interface ProviderProps {}

const Provider: FC<ProviderProps> = ({ children }) => (
  // <StrictMode>
  <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUB || ''}>
    <Router>
      <StoreProvider store={store}>{children}</StoreProvider>
    </Router>
  </StripeProvider>
  // </StrictMode>
);

export default Provider;
