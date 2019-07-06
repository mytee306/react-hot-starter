import { Typography } from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import Button from 'components/Button';
import React, { FC, useState } from 'react';
import { Box } from 'rebass';
import { CountState, CreateDecrementBy } from 'store/slices/count';

export interface DecrementProps {
  decrementBy: CreateDecrementBy;
  isLoading: CountState['isLoading'];
}

const Decrement: FC<DecrementProps> = ({ decrementBy, isLoading }) => {
  const [amount, setAmount] = useState(1);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        decrementBy(amount);
      }}
    >
      <Box
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          alignItems: 'center',
          gridGap: 10,
        }}
      >
        <Typography>Decrement By Amount</Typography>
        <Typography variant="title">{amount}</Typography>
      </Box>
      <br />
      <br />
      <Slider
        min={1}
        max={10}
        value={amount}
        onChange={(_, value) => setAmount(value)}
        step={1}
        style={{ marginLeft: 5 }}
      />

      <br />
      <br />
      <Button
        color="secondary"
        variant="contained"
        type="submit"
        isLoading={isLoading}
      >
        Decrement
      </Button>
    </form>
  );
};

export default Decrement;
