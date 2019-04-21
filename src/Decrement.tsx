import { Button, Divider, FormControl, TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { withState } from 'recompose';
import { Count, CreateDecrementByAction } from './store/slices/count';

export interface DecrementProps {
  decrementBy: CreateDecrementByAction;
  amount: Count;
  setAmount: (amount: Count) => Count;
}

const Decrement: FC<DecrementProps> = ({ decrementBy, amount, setAmount }) => {
  const [isErrorDisplayed, displayError] = useState(false);

  return (
    <form>
      <FormControl>
        <TextField
          label="Decrement By Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={({ target: { value } }) => {
            const newAmount = parseInt(value, 10);

            if (Number.isNaN(newAmount)) {
              displayError(true);
            } else {
              setAmount(newAmount);

              displayError(false);
            }
          }}
          error={isErrorDisplayed}
          helperText={isErrorDisplayed && 'Please input a valid integer'}
        />
      </FormControl>
      <br />
      <br />
      <Divider />
      <br />
      <Button
        color="secondary"
        variant="contained"
        onClick={() => decrementBy(amount)}
      >
        Decrement
      </Button>
    </form>
  );
};

export default withState('amount', 'setAmount', 1)(Decrement);
