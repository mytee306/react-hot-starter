import React, { FC } from 'react';
import { CreateSimpleAction } from '../models/actions';
import Button from '../components/Button';

export interface IncrementProps {
  increment: CreateSimpleAction;
}

const Increment: FC<IncrementProps> = ({ increment }) => (
  <Button color="primary" variant="contained" onClick={() => increment()}>
    Increment
  </Button>
);

export default Increment;
