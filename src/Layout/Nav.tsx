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
import { Link } from 'components';
import { capitalize, countBy } from 'lodash';
import React, { CSSProperties, FC, ReactElement, useState } from 'react';
import urlJoin from 'url-join';
import { objectMap, toAbsolutePath, toObject } from 'utils';

interface IChildNavItem {
  text: string;
  icon: ReactElement;
  path: string;
}

interface INavItem extends IChildNavItem {
  childNavItems: INavItems; // eslint-disable-line no-use-before-define
}

type INavItems = INavItem[];

const rootPathnames = [
  'signin',
  'dashboard',
  'count',
  'images',
  'store',
] as const;

export const absoluteRootPathnames = rootPathnames.map(toAbsolutePath);

export const textRootPathnames = rootPathnames.map(capitalize);

type RootPathnames = typeof rootPathnames[number];

const secondaryPathnames = ['increment', 'decrement'] as const;

type SecondaryPathnames = typeof secondaryPathnames[number];

const pathnames: Array<RootPathnames | SecondaryPathnames> = [
  ...rootPathnames,
  ...secondaryPathnames,
];

const toAbsolutePathObject = objectMap(toAbsolutePath);

const rootPaths = toObject(rootPathnames);

export const absoluteRootPaths: Record<keyof typeof rootPaths, string> = {
  ...toAbsolutePathObject(rootPaths),
  dashboard: '/',
};

const paths = toObject(pathnames);

export const textPaths = objectMap(capitalize)(paths);

const absolutePaths = toAbsolutePathObject(paths);

const publicNavItems: INavItems = [
  {
    text: textPaths.signin,
    icon: <Person />,
    path: absolutePaths.signin,
    childNavItems: [],
  },
];

const privateNavItems: INavItems = [
  {
    text: textPaths.dashboard,
    icon: <Dashboard />,
    path: '',
    childNavItems: [],
  },
  {
    text: textPaths.count,
    path: absolutePaths.count,
    icon: <BarChart />,
    childNavItems: [
      {
        text: textPaths.increment,
        icon: <ArrowUpward />,
        path: absolutePaths.increment,
        childNavItems: [],
      },
      {
        text: textPaths.decrement,
        icon: <ArrowDownward />,
        path: absolutePaths.decrement,
        childNavItems: [],
      },
    ],
  },
  {
    text: textPaths.images,
    path: absolutePaths.images,
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
