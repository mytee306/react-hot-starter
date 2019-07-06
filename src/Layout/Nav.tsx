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
  CloudUpload,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Person,
} from '@material-ui/icons';
import Link from 'components/Link';
import { countBy, kebabCase } from 'lodash';
import { pipe } from 'ramda';
import React, { CSSProperties, FC, ReactElement, useState } from 'react';
import urlJoin from 'url-join';
import { makeAbsolute } from 'utils';

const toPath = pipe(
  makeAbsolute,
  kebabCase,
);

interface IChildNavItem {
  text: string;
  icon: ReactElement;
  path: string;
}

interface INavItem extends IChildNavItem {
  childNavItems: INavItems; // eslint-disable-line no-use-before-define
}

type INavItems = INavItem[];

const signin = 'signin';

const publicNavItems: INavItems = [
  {
    text: signin,
    icon: <Person />,
    path: toPath(signin),
    childNavItems: [],
  },
];

const home = 'Dashboard';
const count = 'Count';
const increment = 'Increment';
const decrement = 'Decrement';
const images = 'Images';

const privateNavItems: INavItems = [
  {
    text: home,
    icon: <Dashboard />,
    path: '',
    childNavItems: [],
  },
  {
    text: count,
    path: toPath(count),
    icon: <BarChart />,
    childNavItems: [
      {
        text: increment,
        icon: <ArrowUpward />,
        path: toPath(increment),
        childNavItems: [],
      },
      {
        text: decrement,
        icon: <ArrowDownward />,
        path: toPath(decrement),
        childNavItems: [],
      },
    ],
  },
  {
    text: images,
    path: toPath(images),
    icon: <CloudUpload />,
    childNavItems: [],
  },
];

type OnNavigate = () => void;

interface ChildNavItemProps extends IChildNavItem {
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

interface NavItemProps extends INavItem, WithTheme {
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

  const { '/': level } = countBy(navItemProps.path);

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
        style={{ marginLeft: theme.spacing(level) }}
      >
        <NavItems
          navItems={childNavItems.map(({ path, ...childItem }) => ({
            ...childItem,
            path: urlJoin(navItemProps.path, path),
          }))}
          onNavigate={onNavigate}
        />
      </Collapse>
    </>
  );
};

const NavItem = withTheme(NavItemWithoutTheme);

interface NavItemsProps {
  navItems: INavItems;
  onNavigate: OnNavigate;
}

const NavItems: FC<NavItemsProps> = ({ navItems, onNavigate }) => (
  <List>
    {navItems.map(navItem => {
      const { childNavItems, text, path } = navItem;
      const navItemProps = {
        ...navItem,
        key: text,
        onNavigate,
        path,
      };

      return childNavItems.length ? (
        <NavItem {...navItemProps} />
      ) : (
        <ChildNavItem {...navItemProps} />
      );
    })}
  </List>
);

export interface NavProps {
  isSignedIn: boolean;
  onNavigate: OnNavigate;
}

const Nav: FC<NavProps> = ({ isSignedIn, onNavigate }) => (
  <nav>
    <NavItems
      onNavigate={onNavigate}
      navItems={isSignedIn ? privateNavItems : publicNavItems}
    />
  </nav>
);

export default Nav;
