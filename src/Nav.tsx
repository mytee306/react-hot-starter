/* eslint-disable jsx-a11y/anchor-is-valid */

import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import {
  ArrowDownward,
  ArrowUpward,
  Dashboard,
  Person,
  BarChart,
  ExpandMore,
} from '@material-ui/icons';
import dashify from 'dashify';
import join from 'url-join';
import React, { SFC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Omit } from 'utility-types'; // eslint-disable-line import/no-extraneous-dependencies

export interface NavItem {
  text: string;
  icon: JSX.Element;
  path: string;
  children: NavItem[];
}
export type NavItems = NavItem[];

const Login = 'Login';

const Home = 'Dashboard';
const Count = 'Count';
const Increment = 'Increment';
const Decrement = 'Decrement';

export const privateNavItems: NavItems = [
  {
    text: Home,
    icon: <Dashboard />,
    path: '',
    children: [],
  },
  {
    text: Count,
    path: dashify(Count),
    icon: <BarChart />,
    children: [
      {
        text: Increment,
        icon: <ArrowUpward />,
        path: dashify(Increment),
        children: [],
      },
      {
        text: Decrement,
        icon: <ArrowDownward />,
        path: dashify(Decrement),
        children: [],
      },
    ],
  },
];

const publicNavItems: NavItems = [
  {
    text: Login,
    icon: <Person />,
    path: dashify(Login),
    children: [],
  },
];

interface NavItemProps extends Omit<NavItem, 'children'> {
  onNavigate: () => void;
}

const NavItem: SFC<NavItemProps> = ({ onNavigate, text, path, icon }) => (
  <Link
    key={text}
    onClick={onNavigate}
    component={(props: Omit<NavLinkProps, 'to'>) => (
      <NavLink {...props} to={path} />
    )}
  >
    <ListItem button>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </ListItem>
  </Link>
);

interface NestedNavItemProps extends NavItem, WithStyles {
  onNavigate: () => void;
}

const summaryStyles = {
  expanded: {
    '&$expanded': {
      marginBottom: 0,
    },
  },
};

const UnstyledNestedNavItem: SFC<NestedNavItemProps> = ({
  classes,
  children,
  onNavigate,
  ...navItemProps
}) => (
  <ExpansionPanel style={{ boxShadow: 'none' }}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMore />}
      classes={{ expanded: classes.expanded }}
    >
      <NavItem {...navItemProps} onNavigate={onNavigate} />
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <NavItems navItems={children} onNavigate={onNavigate} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

const NestedNavItem = withStyles(summaryStyles)(UnstyledNestedNavItem);

interface NavItemsProps {
  navItems: NavItems;
  onNavigate: () => void;
}

const NavItems: SFC<NavItemsProps> = ({ navItems, onNavigate }) => (
  <List>
    {navItems.map(navItem => {
      const { children, ...withoutChildren } = navItem;

      return children.length ? (
        <NestedNavItem
          {...withoutChildren}
          key={navItem.text}
          onNavigate={onNavigate}
        >
          {children.map(({ path, ...rest }) => ({
            ...rest,
            path: join('/', navItem.path, path),
          }))}
        </NestedNavItem>
      ) : (
        <NavItem
          {...withoutChildren}
          key={navItem.text}
          onNavigate={onNavigate}
        />
      );
    })}
  </List>
);

export interface NavProps {
  isLoggedIn: boolean;
  onNavigate: () => void;
}

const Nav: SFC<NavProps> = ({ isLoggedIn, onNavigate }) => (
  <nav>
    <NavItems
      onNavigate={onNavigate}
      navItems={isLoggedIn ? privateNavItems : publicNavItems}
    />
  </nav>
);

export default Nav;
