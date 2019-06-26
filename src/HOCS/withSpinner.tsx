import React, { ComponentType } from 'react';
import WithSpinner from '../components/WithSpinner';

export type WithSpinnerProps = {
  loading?: boolean;
};

const withSpinner = <Props extends {}>(Component: ComponentType<Props>) => ({
  loading,
  ...props
}: Props & WithSpinnerProps) => (
  <WithSpinner loading={!!loading}>
    <Component {...props as Props} />
  </WithSpinner>
);

export default withSpinner;
