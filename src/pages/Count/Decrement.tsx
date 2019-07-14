import { Typography } from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import { Button } from 'components';
import React, { ComponentProps, FC, useState } from 'react';
import { CountState, CreateDecrementBy } from 'store/slices';

export interface DecrementProps {
  decrementBy: CreateDecrementBy;
  isLoading: CountState['isLoading'];
}

const min = 1;
const max = 9;

export const marks: ComponentProps<typeof Slider>['marks'] = [
  { value: min, label: 'Minimum' },
  { value: 5, label: 'Middle' },
  { value: max, label: 'Maximum' },
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
        min={min}
        max={max}
        value={amount}
        valueLabelDisplay="on"
        onChange={(_, value) => setAmount(value as number)}
        step={1}
        marks={marks}
        style={{ margin: '0 20px', width: '50%' }}
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
