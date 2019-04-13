import { Button } from '@material-ui/core';
import React, { SFC } from 'react';
import { CountActionCreator } from './store/slices/count';

export interface IncrementProps {
  increment: CountActionCreator;
}

const Increment: SFC<IncrementProps> = ({ increment }) => (
  <>
    <Button color="primary" variant="contained" onClick={() => increment()}>
      Increment
    </Button>
  </>
);

export default Increment;
