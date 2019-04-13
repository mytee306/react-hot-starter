import React, { SFC } from 'react';

export interface IncrementProps {
  increment: () => void;
}

const Increment: SFC<IncrementProps> = ({ increment }) => (
  <>
    <button onClick={() => increment()} type="button">
      Increment
    </button>
  </>
);

export default Increment;
