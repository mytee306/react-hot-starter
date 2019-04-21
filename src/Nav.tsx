import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import dashify from 'dashify';
import React, { SFC } from 'react';
import { NavLink } from 'react-router-dom';
import { Items, NavItems } from './models/NavItems';

export const items: Items = [
  {
    text: 'Increment',
    icon: <ArrowUpward />,
  },
  {
    text: 'Decrement',
    icon: <ArrowDownward />,
  },
];

const navItems: NavItems = items.map(item => ({
  ...item,
  path: dashify(item.text),
}));

export interface NavProps {
  onNavigate: () => void;
}

const Nav: SFC<NavProps> = ({ onNavigate }) => (
  <nav>
    <List>
      {navItems.map(({ text, icon, path }) => (
        <NavLink to={path} key={text} onClick={onNavigate}>
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
