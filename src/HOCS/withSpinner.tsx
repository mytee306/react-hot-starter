import React, { ComponentType } from 'react';
import WithLoader from '../components/WithLoader';

export type WithSpinner = {
  loading?: boolean;
};

const withSpinner = <Props extends {}>(Component: ComponentType<Props>) => ({
  loading,
  ...props
}: Props & WithSpinner) => (
  <WithLoader loading={!!loading}>
    <Component {...props as Props} />
  </WithLoader>
);

export default withSpinner;
