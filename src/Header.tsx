import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { SFC } from 'react';

const styles = createStyles({
  header: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

export interface HeaderProps extends WithStyles<typeof styles> {}

const Header: SFC<HeaderProps> = ({
  classes: { header, grow, menuButton },
}) => (
  <header className={header}>
    <AppBar position="static">
      <Toolbar>
        <IconButton className={menuButton} color="inherit" aria-label="Menu">
          <Menu />
        </IconButton>
        <Typography className={grow} variant="h6" color="inherit">
          App Name
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </header>
);

export default withStyles(styles)(Header);
