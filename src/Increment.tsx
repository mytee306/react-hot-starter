import React, { SFC } from 'react';
import { CountActionCreator } from './store/slices/count';

export interface IncrementProps {
  increment: CountActionCreator;
}

const Increment: SFC<IncrementProps> = ({ increment }) => (
  <>
    <button onClick={() => increment()} type="button">
      Increment
    </button>
  </>
);

export default Increment;
