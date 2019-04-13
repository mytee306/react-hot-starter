import { Button } from '@material-ui/core';
import React, { SFC, useState } from 'react';

export interface DecrementProps {
  decrementBy: (amount: number) => void;
  amount: number;
  setAmount: (amount: number) => void;
}

const Decrement: SFC<DecrementProps> = ({ decrementBy, amount, setAmount }) => {
  // const [amount, setAmount] = useState(0); // * state gets reset upon receiving props
  const [isErrorDisplayed, displayError] = useState(false);

  return (
    <form>
      <label htmlFor="decrement">
        Decrement By Amount
        <br />
        <input
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
        />
      </label>
      <br />
      {isErrorDisplayed && <i>Please input a valid integer</i>}
      <hr />
      <Button
        color="secondary"
        variant="raised"
        onClick={() => decrementBy(amount)}
      >
        Decrement
      </Button>
    </form>
  );
};

export default Decrement;
