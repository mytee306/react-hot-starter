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
  match: { path },
  staticContext: _,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);

  const toggleHovered = () => setHovered(!hovered);

  const newPath = to.toString();

  return (
    <NavLink
      {...props}
      to={newPath.startsWith('/') ? newPath : urlJoin(path, newPath)}
      style={{
        textDecoration: hovered ? 'underline' : 'none',
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
