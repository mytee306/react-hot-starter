import React, { CSSProperties, FC } from 'react';
import {
  Button as MaterialButton,
  WithTheme,
  withTheme,
} from '@material-ui/core';
import { ButtonProps as MaterialButtonProps } from '@material-ui/core/Button';
import Spinner from './Spinner';

export interface ButtonProps extends MaterialButtonProps, WithTheme {
  textTransform?: CSSProperties['textTransform'];
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  loading,
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
      disabled={disabled || loading}
    >
      {loading ? (
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
            color="inherit"
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
