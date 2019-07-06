import { Typography } from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import Button from 'components/Button';
import React, { ComponentProps, FC, useState } from 'react';
import { CountState, CreateDecrementBy } from 'store/slices/count';

export interface DecrementProps {
  decrementBy: CreateDecrementBy;
  isLoading: CountState['isLoading'];
}

export const marks: ComponentProps<typeof Slider>['marks'] = [
  { value: 1, label: 'Minimum' },
  { value: 10, label: 'Maximum' },
];

const Decrement: FC<DecrementProps> = ({ decrementBy, isLoading }) => {
  const [amount, setAmount] = useState(1);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        decrementBy(amount);
      }}
    >
      <Typography>Decrement By Amount</Typography>
      <br />
      <br />
      <br />
      <Slider
        min={1}
        max={10}
        value={amount}
        valueLabelDisplay="on"
        onChange={(_, value) => setAmount(value as number)}
        step={1}
        marks={marks}
        style={{ marginLeft: 30 }}
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
