import React, { FC, useState } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

const Link: FC<NavLinkProps & { disabled?: boolean }> = ({
  disabled,
  style,
  color = 'inherit',
  ...props
}) => {
  const [hovered, setHovered] = useState(false);

  const toggleHovered = () => setHovered(!hovered);

  return (
    <NavLink
      {...props}
      style={{
        ...style,
        color,
        textDecoration: hovered ? 'underline' : 'none',
        pointerEvents: disabled ? 'none' : 'initial',
      }}
      onMouseEnter={toggleHovered}
      onMouseLeave={toggleHovered}
    />
  );
};

export default Link;
