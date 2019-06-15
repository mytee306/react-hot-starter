import React, { FC } from 'react';
import Button from '../components/Button';
import { CreateSimpleAction } from '../models/actions';
import { CountState } from '../store/slices/count';

export interface IncrementProps {
  increment: CreateSimpleAction;
  isLoading: CountState['isLoading'];
}

const Increment: FC<IncrementProps> = ({ increment, isLoading }) => (
  <Button
    color="primary"
    variant="contained"
    onClick={() => increment()}
    isLoading={isLoading}
  >
    Increment
  </Button>
);

export default Increment;
