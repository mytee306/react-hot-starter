import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@material-ui/core';
import {
  ArrowDownward,
  ArrowUpward,
  BarChart,
  Brush,
  CloudUpload,
  Collections,
  Dashboard,
  ExpandLess,
  ExpandMore,
  List as ListIcon,
  Person,
  Store,
} from '@material-ui/icons';
import { Link, Tooltip } from 'components';
import { capitalize, countBy } from 'lodash';
import React, { CSSProperties, FC, ReactElement, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
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
  'list',
  'canvas',
  'profile',
] as const;

export const absoluteRootPathnames = rootPathnames.map(toAbsolutePath);

export const textRootPathnames = rootPathnames.map(capitalize);

type RootPathnames = typeof rootPathnames[number];

const secondaryPathnames = ['increment', 'decrement', 'upload'] as const;

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
    path: '/',
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
    icon: <Collections />,
    childNavItems: [
      {
        text: textPaths.upload,
        path: absolutePaths.upload,
        icon: <CloudUpload />,
        childNavItems: [],
      },
    ],
  },
  {
    text: textPaths.store,
    path: absolutePaths.store,
    icon: <Store />,
    childNavItems: [],
  },
  {
    text: textPaths.list,
    path: absolutePaths.list,
    icon: <ListIcon />,
    childNavItems: [],
  },
  {
    text: textPaths.canvas,
    path: absolutePaths.canvas,
    icon: <Brush />,
    childNavItems: [],
  },
  {
    text: textPaths.profile,
    path: absolutePaths.profile,
    icon: <Person />,
    childNavItems: [],
  },
];

type OnNavigate = () => void;

interface ChildNavItemProps extends IChildNavItem, RouteComponentProps {
  onNavigate: OnNavigate;
  style?: React.CSSProperties;
}

const PlainChildNavItem: FC<ChildNavItemProps> = ({
  onNavigate,
  text,
  path,
  icon,
  children,
  location: { pathname },
  style,
}) => (
  <ListItem selected={pathname === path} style={style}>
    <Link
      onClick={onNavigate}
      style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
      to={path}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </Link>
    {children}
  </ListItem>
);

const ChildNavItem = withRouter(PlainChildNavItem);

interface NavItemProps extends INavItem, RouteComponentProps {
  onNavigate: OnNavigate;
}

const expandStyles: CSSProperties = {
  cursor: 'pointer',
};

const PlainNavItem: FC<NavItemProps> = ({
  location: { pathname },
  childNavItems,
  onNavigate,
  ...navItemProps
}) => {
  const theme = useTheme();

  const mappedChildNavItems = childNavItems.map(({ path, ...item }) => ({
    ...item,
    path: urlJoin(navItemProps.path, path),
  }));

  const [isOpen, setOpen] = useState(
    !!mappedChildNavItems.find(({ path }) => pathname === path),
  );
  const toggleOpen = () => setOpen(!isOpen);

  const { '/': level } = countBy(navItemProps.path);

  const boxShadow = `-${theme.spacing(level)}px 0px ${
    theme.palette.primary.light
  }`;

  return (
    <>
      <ChildNavItem {...navItemProps} onNavigate={onNavigate}>
        {isOpen ? (
          <Tooltip title="See less">
            <ExpandLess onClick={toggleOpen} style={expandStyles} />
          </Tooltip>
        ) : (
          <Tooltip title="See more">
            <ExpandMore onClick={toggleOpen} style={expandStyles} />
          </Tooltip>
        )}
      </ChildNavItem>
      <Collapse
        in={isOpen}
        timeout="auto"
        style={{
          marginLeft: theme.spacing(level),
        }}
      >
        <NavItems
          navItems={mappedChildNavItems.map(childItem => ({
            ...childItem,
            style: { boxShadow },
          }))}
          onNavigate={onNavigate}
        />
      </Collapse>
    </>
  );
};

const NavItem = withRouter(PlainNavItem);

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
