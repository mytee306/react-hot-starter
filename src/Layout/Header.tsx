import {
  AppBar,
  createStyles,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Menu, WbSunny, WbSunnyOutlined } from '@material-ui/icons';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { CreateSimpleAction } from '../models/actions';
import { selectDarkThemeFlag, State } from '../store/reducer';
import { createToggleType } from '../store/slices/theme/palette/type';
import Button from '../components/Button';

const headerStyles = createStyles({
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

export interface HeaderProps extends WithStyles<typeof headerStyles> {
  toggle: () => void;
  isDark: boolean;
  togglePaletteType: CreateSimpleAction;
}

const Header: FC<HeaderProps> = ({
  classes: { header, expand, menuButton },
  toggle,
  isDark,
  togglePaletteType,
}) => (
  <AppBar position="static" className={header}>
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
      <Button>Log out</Button>
      <Button onClick={() => togglePaletteType()}>
        {isDark ? <WbSunny /> : <WbSunnyOutlined />}
      </Button>
    </Toolbar>
  </AppBar>
);

const mapStateToProps = (state: State) => ({
  isDark: selectDarkThemeFlag(state),
});

const mapDispatchToProps = {
  togglePaletteType: createToggleType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(headerStyles)(Header));
