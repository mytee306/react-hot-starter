import { Link as MaterialLink, Omit } from '@material-ui/core';
import { LinkProps } from '@material-ui/core/Link';
import React, { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

const Link: FC<Omit<LinkProps, 'component'> & NavLinkProps> = ({
  to,
  color = 'inherit',
  ...props
}) => (
  <MaterialLink
    {...props}
    color={color}
    component={(navLinkProps: Omit<NavLinkProps, 'to'>) => (
      <NavLink {...navLinkProps} to={to} />
    )}
  />
);

export default Link;
