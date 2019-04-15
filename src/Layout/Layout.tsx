import {
  createStyles,
  Divider,
  Drawer,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import React, { SFC, useState } from 'react';
import Header from '../Header';
import Nav from '../Nav';

export const LayoutStyle = (theme: Theme) =>
  createStyles({
    drawer: {
      width: 240,
    },
    toolbar: theme.mixins.toolbar,
  });

export interface ResponsiveDrawerProps extends WithStyles<typeof LayoutStyle> {}

const ResponsiveDrawer: SFC<ResponsiveDrawerProps> = ({
  classes,
  children,
}) => {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(previousOpen => !previousOpen);
  };

  return (
    <section>
      <Header />
      <Drawer
        variant="persistent"
        open={open}
        onClose={handleDrawerToggle}
        className={classes.drawer}
      >
        <div className={classes.toolbar} />
        <Divider />
        <Nav />
      </Drawer>
      <main>{children}</main>
    </section>
  );
};

export default withStyles(LayoutStyle, { withTheme: true })(ResponsiveDrawer);
