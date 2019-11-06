import { Typography } from '@material-ui/core';
import { Button } from 'components';
import React from 'react';
import {
  CardElement,
  Elements,
  injectStripe,
  ReactStripeElements,
} from 'react-stripe-elements';
import { Box } from 'rebass';

type StripeProps = ReactStripeElements.InjectedStripeProps;

export interface CheckoutFormProps extends StripeProps {}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ stripe }) => (
  <Box className="checkout">
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
);

const CheckoutFormElement = injectStripe(CheckoutForm);

export default () => (
  <Elements>
    <CheckoutFormElement />
  </Elements>
);
