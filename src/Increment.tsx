import { Button } from '@material-ui/core';
import React, { FC } from 'react';
import { IncrementActionCreator } from './store/slices/count';

export interface IncrementProps {
  increment: IncrementActionCreator;
}

const Increment: FC<IncrementProps> = ({ increment }) => (
  <>
    <Button color="primary" variant="contained" onClick={increment}>
      Increment
    </Button>
  </>
);

export default Increment;
