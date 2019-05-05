/* eslint-disable jsx-a11y/anchor-is-valid */

import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import {
  ArrowDownward,
  ArrowUpward,
  Dashboard,
  Person,
  BarChart,
  ExpandMore,
  ExpandLess,
} from '@material-ui/icons';
import dashify from 'dashify';
import join from 'url-join';
import React, { SFC, useState, ReactElement, CSSProperties } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Omit } from 'utility-types'; // eslint-disable-line import/no-extraneous-dependencies

interface NavItem {
  text: string;
  icon: ReactElement;
  path: string;
  childNavItems: NavItems;
}
type NavItems = NavItem[];

const Login = 'Login';

const publicNavItems: NavItems = [
  {
    text: Login,
    icon: <Person />,
    path: dashify(Login),
    childNavItems: [],
  },
];

const Home = 'Dashboard';
const Count = 'Count';
const Increment = 'Increment';
const Decrement = 'Decrement';

const privateNavItems: NavItems = [
  {
    text: Home,
    icon: <Dashboard />,
    path: '',
    childNavItems: [],
  },
  {
    text: Count,
    path: dashify(Count),
    icon: <BarChart />,
    childNavItems: [
      {
        text: Increment,
        icon: <ArrowUpward />,
        path: dashify(Increment),
        childNavItems: [],
      },
      {
        text: Decrement,
        icon: <ArrowDownward />,
        path: dashify(Decrement),
        childNavItems: [],
      },
    ],
  },
];

interface NavItemProps extends Omit<NavItem, 'childNavItems'> {
  onNavigate: () => void;
}

const NavItem: SFC<NavItemProps> = ({
  onNavigate,
  text,
  path,
  icon,
  children,
}) => (
  <>
    <ListItem>
      <Link
        onClick={onNavigate}
        style={{ flexGrow: 1, display: 'flex' }}
        component={(props: Omit<NavLinkProps, 'to'>) => (
          <NavLink {...props} to={path} />
        )}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </Link>
      {children}
    </ListItem>
  </>
);

interface ParentNavItemProps extends NavItem, WithStyles {
  onNavigate: () => void;
  theme: Theme;
}

const expandStyles: CSSProperties = {
  cursor: 'pointer',
};

const ParentNavItemWithoutTheme: SFC<ParentNavItemProps> = ({
  childNavItems,
  onNavigate,
  theme,
  ...navItemProps
}) => {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen(open => !open);

  const absolutePath = join('/', navItemProps.path);
  const level = absolutePath.split('/').filter(Boolean).length;

  return (
    <>
      <NavItem {...navItemProps} onNavigate={onNavigate}>
        {isOpen ? (
          <ExpandLess onClick={toggleOpen} style={expandStyles} />
        ) : (
          <ExpandMore onClick={toggleOpen} style={expandStyles} />
        )}
      </NavItem>
      <Collapse
        in={isOpen}
        timeout="auto"
        style={{ marginLeft: theme.spacing.unit * level }}
      >
        <NavItems
          navItems={childNavItems.map(({ path, ...childItem }) => ({
            ...childItem,
            path: join(absolutePath, path),
          }))}
          onNavigate={onNavigate}
        />
      </Collapse>
    </>
  );
};

const ParentNavItem = withStyles({}, { withTheme: true })(
  ParentNavItemWithoutTheme,
);

interface NavItemsProps {
  navItems: NavItems;
  onNavigate: () => void;
}

const NavItems: SFC<NavItemsProps> = ({ navItems, onNavigate }) => (
  <List>
    {navItems.map(navItem => {
      const { childNavItems, text } = navItem;
      const navItemProps = { ...navItem, key: text, onNavigate };

      return childNavItems.length ? (
        <ParentNavItem {...navItemProps} />
      ) : (
        <NavItem {...navItemProps} />
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
