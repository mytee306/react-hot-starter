import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  ArrowDownward,
  ArrowUpward,
  Dashboard,
  Person,
} from '@material-ui/icons';
import dashify from 'dashify';
import React, { SFC } from 'react';
import { NavLink } from 'react-router-dom';

const Home = 'Dashboard';
const Increment = 'Increment';
const Decrement = 'Decrement';

const Login = 'Login';

export interface NavItem {
  text: string;
  icon: JSX.Element;
  path: string;
}
export type NavItems = NavItem[];

export const privateNavItems: NavItems = [
  {
    text: Home,
    icon: <Dashboard />,
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

const publicNavItems: NavItems = [
  {
    text: Login,
    icon: <Person />,
    path: dashify(Login),
  },
];

export interface NavProps {
  isLoggedIn: boolean;
  onNavigate: () => void;
}

const Nav: SFC<NavProps> = ({ isLoggedIn, onNavigate }) => (
  <nav>
    <List>
      {(isLoggedIn ? privateNavItems : publicNavItems).map(({ text, icon, path }) => (
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
