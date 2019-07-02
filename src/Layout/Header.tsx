import { AppBar, createStyles, Hidden, Toolbar, Tooltip, Typography, WithStyles, withStyles } from '@material-ui/core';
import { Menu, Person, WbSunny, WbSunnyOutlined } from '@material-ui/icons';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import IconButton from '../components/IconButton';
import { CreateSimpleAction } from '../models/actions';
import { selectAuthLoadingFlag, selectDarkThemeFlag, selectSignedInFlag, State } from '../store/reducer';
import { createSignout } from '../store/slices/auth';
import { createToggleType } from '../store/slices/theme/palette/type';

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
  isDark: ReturnType<typeof selectDarkThemeFlag>;
  togglePaletteType: CreateSimpleAction;
  isSignedIn: ReturnType<typeof selectSignedInFlag>;
  signOut: CreateSimpleAction;
  isAuthLoading: ReturnType<typeof selectAuthLoadingFlag>;
}

const Header: FC<HeaderProps> = ({
  classes: { header, expand, menuButton },
  toggle,
  isDark,
  togglePaletteType,
  isSignedIn,
  signOut,
  isAuthLoading,
}) => (
  <AppBar position="static" className={header}>
    <Toolbar>
      <Hidden lgUp>
        <IconButton className={menuButton} aria-label="Menu" onClick={toggle}>
          <Menu />
        </IconButton>
      </Hidden>
      <Typography className={expand} variant="h6" color="inherit">
        App Name
      </Typography>
      <Tooltip title="Toggle dark theme">
        <IconButton onClick={() => togglePaletteType()}>
          {isDark ? <WbSunny /> : <WbSunnyOutlined />}
        </IconButton>
      </Tooltip>
      {(isSignedIn || isAuthLoading) && (
        <Tooltip title="Sign out">
          <IconButton onClick={() => signOut()} loading={isAuthLoading}>
            <Person />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  </AppBar>
);

const mapStateToProps = (state: State) => ({
  isDark: selectDarkThemeFlag(state),
  isSignedIn: selectSignedInFlag(state),
  isAuthLoading: selectAuthLoadingFlag(state),
});

const mapDispatchToProps = {
  togglePaletteType: createToggleType,
  signOut: createSignout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(headerStyles)(Header));
