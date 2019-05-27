import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withTheme,
  WithTheme,
} from '@material-ui/core';
import {
  ArrowDownward,
  ArrowUpward,
  BarChart,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Person,
} from '@material-ui/icons';
import dashify from 'dashify';
import React, { CSSProperties, FC, ReactElement, useState } from 'react';
import urlJoin from 'url-join';
import Link from '../components/Link';

interface ChildNavItem {
  text: string;
  icon: ReactElement;
  path: string;
}

interface NavItem extends ChildNavItem {
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

type OnNavigate = () => void;

interface ChildNavItemProps extends ChildNavItem {
  onNavigate: OnNavigate;
}

const ChildNavItem: FC<ChildNavItemProps> = ({
  onNavigate,
  text,
  path,
  icon,
  children,
}) => (
  <ListItem>
    <Link
      onClick={onNavigate}
      style={{ flexGrow: 1, display: 'flex' }}
      to={path}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </Link>
    {children}
  </ListItem>
);

interface NavItemProps extends NavItem, WithTheme {
  onNavigate: OnNavigate;
}

const expandStyles: CSSProperties = {
  cursor: 'pointer',
};

const NavItemWithoutTheme: FC<NavItemProps> = ({
  childNavItems,
  onNavigate,
  theme,
  ...navItemProps
}) => {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen(open => !open);

  const absolutePath = urlJoin('/', navItemProps.path);
  const level = absolutePath.split('/').filter(Boolean).length;

  return (
    <>
      <ChildNavItem {...navItemProps} onNavigate={onNavigate}>
        {isOpen ? (
          <ExpandLess onClick={toggleOpen} style={expandStyles} />
        ) : (
          <ExpandMore onClick={toggleOpen} style={expandStyles} />
        )}
      </ChildNavItem>
      <Collapse
        in={isOpen}
        timeout="auto"
        style={{ marginLeft: theme.spacing.unit * level }}
      >
        <NavItems
          navItems={childNavItems.map(({ path, ...childItem }) => ({
            ...childItem,
            path: urlJoin(absolutePath, path),
          }))}
          onNavigate={onNavigate}
        />
      </Collapse>
    </>
  );
};

const NavItem = withTheme()(NavItemWithoutTheme);

interface NavItemsProps {
  navItems: NavItems;
  onNavigate: OnNavigate;
}

const NavItems: FC<NavItemsProps> = ({ navItems, onNavigate }) => (
  <List>
    {navItems.map(navItem => {
      const { childNavItems, text } = navItem;
      const navItemProps = { ...navItem, key: text, onNavigate };

      return childNavItems.length ? (
        <NavItem {...navItemProps} />
      ) : (
        <ChildNavItem {...navItemProps} />
      );
    })}
  </List>
);

export interface NavProps {
  isLoggedIn: boolean;
  onNavigate: OnNavigate;
}

const Nav: FC<NavProps> = ({ isLoggedIn, onNavigate }) => (
  <nav>
    <NavItems
      onNavigate={onNavigate}
      navItems={isLoggedIn ? privateNavItems : publicNavItems}
    />
  </nav>
);

export default Nav;
