import React, { FC, useState } from 'react';
import {
  NavLink,
  NavLinkProps,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import urlJoin from 'url-join';

export interface LinkProps
  extends Omit<NavLinkProps, 'location'>,
    RouteComponentProps {
  disabled?: boolean;
}

const Link: FC<LinkProps> = ({
  disabled,
  style,
  color = 'inherit',
  to,
  location: { pathname },
  staticContext: _,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);

  const toggleHovered = () => setHovered(!hovered);

  const path = to.toString();

  const fullPath = path.startsWith('/') ? path : urlJoin(pathname, path);

  return (
    <NavLink
      {...props}
      to={fullPath}
      style={{
        textDecoration: hovered || fullPath === pathname ? 'underline' : 'none',
        ...style,
        color,
        pointerEvents: disabled ? 'none' : 'initial',
      }}
      onMouseEnter={toggleHovered}
      onMouseLeave={toggleHovered}
    />
  );
};

export default withRouter(Link);
