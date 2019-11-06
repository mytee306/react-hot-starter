import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { Stripe, WithDrift } from 'models';
import React, { FC } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';
import configureStore from 'store';

const store = configureStore();

export interface ProviderProps {}

const Provider: FC<ProviderProps> = ({ children }) => {
  const [stripe, setStripe] = React.useState<Stripe>(null);

  React.useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.REACT_APP_STRIPE_PUB || ''));
    }
  }, []);

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      LogRocket.init('7lfo0w/react-hot-starter-dev');

      setupLogRocketReact(LogRocket);

      LogRocket.getSessionURL(sessionURL => {
        // * in contrary to the second condition the first one is runtime safe but not typesafe
        // if (window.drift && typeof window.drift.track === 'function') {
        if ('drift' in window) {
          const windowWithDrift = window as typeof window & WithDrift;
          windowWithDrift.drift.track('LogRocket', {
            sessionURL,
          });
        }
      });
    }
  }, []);

  return (
    // <StrictMode>
    <StripeProvider stripe={stripe}>
      <Router>
        <StoreProvider store={store}>{children}</StoreProvider>
      </Router>
    </StripeProvider>
    // </StrictMode>
  );
};

export default Provider;
