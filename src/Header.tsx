import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
  Hidden,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { SFC } from 'react';

const styles = createStyles({
  header: {
    flexGrow: 1,
  },
  expand: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

export interface HeaderProps extends WithStyles<typeof styles> {
  toggle: () => void;
}

const Header: SFC<HeaderProps> = ({
  classes: { header, expand, menuButton },
  toggle,
}) => (
  <header className={header}>
    <AppBar position="static">
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            className={menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={toggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
        <Typography className={expand} variant="h6" color="inherit">
          App Name
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </header>
);

export default withStyles(styles)(Header);
