import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  ArrowDownward,
  ArrowUpward,
  Home as HomeIcon,
} from '@material-ui/icons';
import dashify from 'dashify';
import React, { SFC } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItems } from './models/NavItems';

const Home = 'Home';
const Increment = 'Increment';
const Decrement = 'Decrement';

export const navItems: NavItems = [
  {
    text: Home,
    icon: <HomeIcon />,
    path: '',
  },
  {
    text: Increment,
    icon: <ArrowUpward />,
    path: dashify(Increment),
  },
  {
    text: Decrement,
    icon: <ArrowDownward />,
    path: dashify(Decrement),
  },
];

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
