import React, { SFC } from 'react';
import { Typography } from '@material-ui/core';

export interface CountProps {
  count: number;
}

const Count: SFC<CountProps> = ({ count }) => (
  <Typography variant="h1">Count: {count}</Typography>
);

export default Count;
