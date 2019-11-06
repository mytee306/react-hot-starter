import { Typography } from '@material-ui/core';
import { Button } from 'components';
import env from 'env';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  CardElement,
  Elements,
  injectStripe,
  ReactStripeElements,
} from 'react-stripe-elements';
import { Box } from 'rebass';
import urlJoin from 'url-join';

export interface CheckoutFormProps
  extends ReactStripeElements.InjectedStripeProps,
    RouteComponentProps {}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  stripe,
  location: { pathname },
}) => {
  const redirectionURL = urlJoin(env.publicUrl, pathname);

  return (
    <Box>
      <Box mb={40}>
        <Typography>Would you like to complete the purchase?</Typography>
        <CardElement />
        <Button
          onClick={() => {
            if (stripe) {
              stripe
                .createToken({ name: 'Name' })
                .then(({ token }) => token)
                .then(console.log); // eslint-disable-line no-console
            }
          }}
        >
          Purchase
        </Button>
      </Box>
      <Button
        variant="contained"
        color="primary"
        role="link"
        onClick={() => {
          if (stripe) {
            (stripe as any)
              .redirectToCheckout({
                items: [{ sku: 'sku_G80fsca4Ygr259', quantity: 1 }],

                successUrl: redirectionURL,
                cancelUrl: redirectionURL,
              })
              .then((result: { error?: Error }) => {
                if (result.error) {
                  console.log(result.error); // eslint-disable-line no-console
                }
              });
          }
        }}
      >
        Purchase Trifle
      </Button>
    </Box>
  );
};

const CheckoutFormElement = injectStripe(CheckoutForm);

export default (props: RouteComponentProps) => (
  <Elements>
    <CheckoutFormElement {...props} />
  </Elements>
);
