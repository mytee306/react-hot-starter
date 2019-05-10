import {
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { ChevronLeft } from '@material-ui/icons';
import { Breadcrumbs } from '@material-ui/lab';
import { startCase } from 'lodash';
import { init, last } from 'ramda';
import React, { FC, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import join from 'url-join';
import Link from './components/Link';
import Header from './Header';
import Nav from './Nav';

const minWidth = 240;

const margin = 20;

export const LayoutStyles = (theme: Theme) =>
  createStyles({
    drawer: {
      minWidth,
    },
    drawerPaper: {
      minWidth,
    },
    toolbar: {
      ...theme.mixins.toolbar,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    content: {
      margin,
      [theme.breakpoints.up('lg')]: {
        marginLeft: margin + minWidth,
      },
      transition: theme.transitions.create(['margin'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.standard,
      }),
    },
  });

export interface LayoutProps
  extends RouteComponentProps,
    WithStyles<typeof LayoutStyles> {
  theme: Theme;
  isLoggedIn: boolean;
}

const Layout: FC<LayoutProps> = ({
  classes: { toolbar, drawer, drawerPaper, content },
  children,
  theme,
  isLoggedIn,
  location: { pathname },
}) => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(previousOpen => !previousOpen);
  };

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const pathnames = pathname
    .split('/')
    .filter(Boolean)
    .map(startCase);

  return (
    <section>
      <CssBaseline />
      <Header toggle={handleDrawerToggle} />
      <Breadcrumbs separator="›" style={{ marginLeft: 10, marginTop: 10 }}>
        <Link to="/" color="inherit">
          Dashboard
        </Link>
        {init(pathnames).map(name => (
          <Link key={name} to={join('/', name)}>
            {name}
          </Link>
        ))}
        <Typography color="textPrimary">{last(pathnames)}</Typography>
      </Breadcrumbs>
      <Drawer
        variant={isLargeScreen ? 'permanent' : 'temporary'}
        open={open}
        onClose={handleDrawerToggle}
        className={drawer}
        classes={{
          paper: drawerPaper,
        }}
      >
        <div className={toolbar}>
          <Hidden lgUp>
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeft />
            </IconButton>
          </Hidden>
        </div>
        <Divider />
        <Nav isLoggedIn={isLoggedIn} onNavigate={handleDrawerToggle} />
      </Drawer>
      <main className={content}>{children}</main>
    </section>
  );
};

export default withStyles(LayoutStyles, { withTheme: true })(
  withRouter(Layout),
);
