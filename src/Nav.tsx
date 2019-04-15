import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import React, { SFC } from 'react';
import { NavLink } from 'react-router-dom';

export const getPathFromText = (text: string) =>
  text
    .toLowerCase()
    .split(' ')
    .join('-')
    .padStart(1, '/');

interface Item {
  text: string;
  icon: JSX.Element;
}

export type NavItem = Item & {
  path: string;
};

export type NavItems = NavItem[];

export const items = [
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
  path: getPathFromText(item.text),
}));

const Nav: SFC = () => (
  <nav>
    <List>
      {navItems.map(({ text, icon, path }) => (
        <NavLink to={path} key={text}>
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
