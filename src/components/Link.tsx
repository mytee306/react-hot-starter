import { Link as MaterialLink, Omit } from '@material-ui/core';
import { LinkProps } from '@material-ui/core/Link';
import React, { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

const Link: FC<Omit<LinkProps, 'component'> & NavLinkProps & { disabled?: boolean }> = ({
  disabled,
  style,
  to,
  color = 'inherit',
  ...props
}) => (
  <MaterialLink
    {...props}
    color={color}
    style={{ ...style, pointerEvents: disabled ? 'none' : 'initial' }}
    component={(navLinkProps: Omit<NavLinkProps, 'to'>) => (
      <NavLink {...navLinkProps} to={to} />
    )}
  />
);

export default Link;
