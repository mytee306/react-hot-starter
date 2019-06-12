import React, { CSSProperties, FC } from 'react';
import { Button as MaterialButton } from '@material-ui/core';
import { ButtonProps as MaterialButtonProps } from '@material-ui/core/Button';

export interface ButtonProps extends MaterialButtonProps {
  textTransform?: CSSProperties['textTransform'];
}

const Button: FC<ButtonProps> = ({ textTransform = 'uppercase', ...props }) => {
  const { style } = props;

  return <MaterialButton {...props} style={{ ...style, textTransform }} />;
};

export default Button;
