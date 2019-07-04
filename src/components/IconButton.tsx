import { IconButton as MaterialIconButton } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import React, { forwardRef } from 'react';
import withSpinner from './HOCS/withSpinner';

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ color = 'inherit', ...props }, ref) => (
    <MaterialIconButton buttonRef={ref} {...props} color={color} />
  ),
);

export default withSpinner(IconButton);
