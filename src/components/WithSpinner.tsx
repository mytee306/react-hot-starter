import React, { FC } from 'react';
import { useTheme } from '../utils';
import Spinner from './Spinner';

export interface WithLoaderProps {
  loading: boolean;
}

const WithSpinner: FC<WithLoaderProps> = ({ loading, children }) => {
  const theme = useTheme();

  return loading ? (
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
    <>{children}</>
  );
};

export default WithSpinner;
