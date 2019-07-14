import {
  AppBar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  createStyles,
  Popover,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Menu, Person, WbSunny, WbSunnyOutlined } from '@material-ui/icons';
import classnames from 'classnames';
import { Button, IconButton, Tooltip } from 'components';
import { CreateSimpleAction } from 'models/actions';
import React, { FC, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  DisplayName,
  PhotoURL,
  selectAuthLoadingFlag,
  selectDarkThemeFlag,
  selectDisplayName,
  selectEmail,
  selectPhotoURL,
  selectSignedInFlag,
  State,
} from 'store';
import { createSignout, User } from 'store/slices';
import { createToggleType } from 'store/slices/theme/palette/type';

const headerStyles = createStyles({
  header: {
    width: 'auto',
  },
  expand: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const avatarWidth = 140;

export interface HeaderProps extends WithStyles<typeof headerStyles> {
  toggle: () => void;
  isDark: ReturnType<typeof selectDarkThemeFlag>;
  togglePaletteType: CreateSimpleAction;
  isSignedIn: ReturnType<typeof selectSignedInFlag>;
  signOut: CreateSimpleAction;
  isAuthLoading: ReturnType<typeof selectAuthLoadingFlag>;
  className?: string;
  displayName: DisplayName;
  email: User['email'];
  photoURL: PhotoURL;
}

const Header: FC<HeaderProps> = ({
  classes: { header, expand, menuButton },
  toggle,
  isDark,
  togglePaletteType,
  isSignedIn,
  signOut,
  isAuthLoading,
  className,
  displayName,
  email,
  photoURL,
}) => {
  const [open, setOpen] = useState(false);
  const profileButtonRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(!open);

  return (
    <AppBar position="static" className={classnames(header, className)}>
      <Toolbar>
        <Tooltip title="Open navigation">
          <IconButton className={menuButton} aria-label="Menu" onClick={toggle}>
            <Menu />
          </IconButton>
        </Tooltip>
        <Typography className={expand} variant="h6" color="inherit">
          App Name
        </Typography>
        <Tooltip title="Toggle dark theme">
          <IconButton onClick={() => togglePaletteType()}>
            {isDark ? <WbSunny /> : <WbSunnyOutlined />}
          </IconButton>
        </Tooltip>
        {(isSignedIn || isAuthLoading) && (
          <Tooltip title="Profile">
            <div ref={profileButtonRef}>
              <IconButton onClick={toggleOpen} loading={isAuthLoading}>
                <Person />
              </IconButton>
            </div>
          </Tooltip>
        )}
        <Popover
          anchorEl={profileButtonRef.current}
          open={open}
          onClose={toggleOpen}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Card>
            <CardActionArea>
              <Box mt={2} style={{ display: 'grid', justifyItems: 'center' }}>
                <CardMedia
                  image={photoURL}
                  title={displayName}
                  style={{
                    height: avatarWidth,
                    width: avatarWidth,
                    borderRadius: '50%',
                  }}
                />
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {displayName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {email}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  signOut();
                  toggleOpen();
                }}
              >
                Sign out
              </Button>
            </CardActions>
          </Card>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: State) => ({
  isDark: selectDarkThemeFlag(state),
  isSignedIn: selectSignedInFlag(state),
  isAuthLoading: selectAuthLoadingFlag(state),
  displayName: selectDisplayName(state),
  email: selectEmail(state),
  photoURL: selectPhotoURL(state),
});

const mapDispatchToProps = {
  togglePaletteType: createToggleType,
  signOut: createSignout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(headerStyles)(Header));
