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
import React, { CSSProperties, FC, ReactElement, useState } from 'react';
import urlJoin from 'url-join';
import { makeAbsolute } from 'utils';

interface IChildNavItem {
  text: string;
  icon: ReactElement;
  path: string;
}

interface INavItem extends IChildNavItem {
  childNavItems: INavItems; // eslint-disable-line no-use-before-define
}

type INavItems = INavItem[];

const Signin = 'Signin';

const publicNavItems: INavItems = [
  {
    text: Signin,
    icon: <Person />,
    path: kebabCase(Signin),
    childNavItems: [],
  },
];

const Home = 'Dashboard';
const Count = 'Count';
const Increment = 'Increment';
const Decrement = 'Decrement';
const Images = 'Images';

const privateNavItems: INavItems = [
  {
    text: Home,
    icon: <Dashboard />,
    path: '',
    childNavItems: [],
  },
  {
    text: Count,
    path: kebabCase(Count),
    icon: <BarChart />,
    childNavItems: [
      {
        text: Increment,
        icon: <ArrowUpward />,
        path: kebabCase(Increment),
        childNavItems: [],
      },
      {
        text: Decrement,
        icon: <ArrowDownward />,
        path: kebabCase(Decrement),
        childNavItems: [],
      },
    ],
  },
  {
    text: Images,
    path: kebabCase(Images),
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

  const absolutePath = makeAbsolute(navItemProps.path);
  const { '/': level } = countBy(absolutePath);

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
            path: urlJoin(absolutePath, path),
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
        path: makeAbsolute(path),
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
