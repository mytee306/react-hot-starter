import React, { ComponentType } from 'react';
import WithLoader from '../components/WithLoader';

export type WithSpinner = {
  loading?: boolean;
};

const withSpinner = <Props extends {}>(Component: ComponentType<Props>) => (
  props: Props & WithSpinner,
) => {
  const { loading } = props;

  return (
    <WithLoader loading={!!loading}>
      <Component {...props} />
    </WithLoader>
  );
};

export default withSpinner;
