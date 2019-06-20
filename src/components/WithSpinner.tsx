import { withTheme, WithTheme } from '@material-ui/core';
import React from 'react';
import Spinner from './Spinner';

export interface WithSpinnerProps extends WithTheme {
  loading: boolean;
}

const WithSpinner: React.FC<WithSpinnerProps> = ({
  children,
  theme,
  loading,
}) =>
  loading ? (
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
    <>children</>
  );

export default withTheme()(WithSpinner);
