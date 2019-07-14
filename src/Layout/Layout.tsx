import {
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { IconButton } from 'components';
import { EnhancedTheme } from 'models';
import React, { FC, useState } from 'react';
import Breadcrumbs from './Breadcrumbs';
import Header from './Header';
import Nav from './Nav';

const drawerWidth = 240;

const contentMargin = 20;

export const layoutStyles = (theme: EnhancedTheme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
    },
    toolbar: {
      ...theme.mixins.toolbar,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    breadcrumbs: {
      margin: contentMargin,
    },
  });

export interface LayoutProps extends WithStyles<typeof layoutStyles> {
  theme: EnhancedTheme;
  isSignedIn: boolean;
}

const Layout: FC<LayoutProps> = ({
  classes: { toolbar, drawer, breadcrumbs },
  children,
  theme,
  isSignedIn,
}) => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(previousOpen => !previousOpen);
  };

  return (
    <section
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <Header toggle={handleDrawerToggle} />
      <Drawer
        open={open}
        onClose={handleDrawerToggle}
        className={drawer}
        classes={{
          paper: drawer,
        }}
      >
        <div className={toolbar}>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <Nav isSignedIn={isSignedIn} onNavigate={handleDrawerToggle} />
      </Drawer>
      {isSignedIn && <Breadcrumbs className={breadcrumbs} />}
      <main
        style={{
          flexGrow: 1,
          display: 'grid',
          margin: contentMargin,
        }}
      >
        {children}
      </main>
    </section>
  );
};

export default withStyles(layoutStyles, { withTheme: true })(Layout);
