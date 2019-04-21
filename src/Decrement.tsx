import { Button, Divider, FormControl, TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { Count, DecrementByActionCreator } from './store/slices/count';

export interface DecrementProps {
  decrementBy: DecrementByActionCreator;
  amount: Count;
  setAmount: (amount: Count) => void;
}

const Decrement: FC<DecrementProps> = ({ decrementBy, amount, setAmount }) => {
  // const [amount, setAmount] = useState(1); // * state gets reset upon receiving props
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

            if (newAmount) {
              setAmount(newAmount);

              displayError(false);
            } else {
              displayError(true);
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

export default Decrement;
