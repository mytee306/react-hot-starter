import React from 'react';
import { IconButton as MaterialIconButton } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';

const IconButton: React.FC<IconButtonProps> = ({
  color = 'inherit',
  ...props
}) => <MaterialIconButton {...props} color={color} />;

export default IconButton;
