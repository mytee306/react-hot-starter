import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { List } from '@material-ui/icons';
import React, { SFC } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItems } from './constants/menuItems';

const Nav: SFC<{ items: MenuItems }> = ({ items }) => (
  <nav>
    <List>
      {items.map(({ text, icon, path }) => (
        <NavLink to={path}>
          <ListItem button key={text}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </ListItem>
        </NavLink>
      ))}
    </List>
  </nav>
);

export default Nav;
