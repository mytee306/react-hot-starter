import {
  AppBar,
  Button,
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
import { createToggleTypeAction } from '../store/slices/theme/palette/type';

const HeaderStyles = createStyles({
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

export interface HeaderProps extends WithStyles<typeof HeaderStyles> {
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
      <Button color="inherit" onClick={() => togglePaletteType()}>
        {isDark ? <WbSunny /> : <WbSunnyOutlined />}
      </Button>
    </Toolbar>
  </AppBar>
);

const mapStateToProps = (state: State) => ({
  isDark: selectDarkThemeFlag(state),
});

const mapDispatchToProps = {
  togglePaletteType: createToggleTypeAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(HeaderStyles)(Header));
