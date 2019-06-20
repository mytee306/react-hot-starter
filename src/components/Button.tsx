import {
  Button as MaterialButton,
  WithTheme,
  withTheme,
} from '@material-ui/core';
import { ButtonProps as MaterialButtonProps } from '@material-ui/core/Button';
import React, { CSSProperties, FC } from 'react';
import Spinner from './Spinner';

export interface ButtonProps extends MaterialButtonProps, WithTheme {
  textTransform?: CSSProperties['textTransform'];
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  isLoading,
  theme,
  textTransform = 'uppercase',
  color = 'inherit',
  ...props
}) => {
  const { style, children, disabled } = props;

  return (
    <MaterialButton
      {...props}
      color={color}
      style={{ ...style, textTransform }}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ visibility: 'hidden' }}>{children}</span>
          <Spinner
            size={theme.typography.fontSize}
            style={{ position: 'absolute' }}
          />
        </div>
      ) : (
        children
      )}
    </MaterialButton>
  );
};

export default withTheme()(Button);
