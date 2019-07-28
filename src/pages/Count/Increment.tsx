import { Button } from 'components';
import { CreateSimpleAction } from 'models';
import React, { FC } from 'react';
import { CountState } from 'store';

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
