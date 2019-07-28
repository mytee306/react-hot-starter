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
  useMediaQuery,
  useTheme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import {
  Menu,
  Person,
  Search,
  WbSunny,
  WbSunnyOutlined,
} from '@material-ui/icons';
import classnames from 'classnames';
import { Button, IconButton, Tooltip } from 'components';
import env from 'env';
import { startCase } from 'lodash';
import { CreateSimpleAction, Maybe } from 'models';
import React, { FC, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Flex } from 'rebass';
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
import Breadcrumbs from './Breadcrumbs';

const labels = [
  'Afghanistan',
  'Aland Islands',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia, Plurinational State of',
  'Bonaire, Sint Eustatius and Saba',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
] as const;

const options = labels.map(label => ({
  label,
  value: label,
}));

type Option = typeof options[number];

const headerStyles = createStyles({
  header: {
    width: 'auto',
  },
  expand: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 10,
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

  const theme = useTheme();

  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up('md'));

  const [value, setValue] = React.useState<Maybe<Option>>(null);

  return (
    <AppBar position="static" className={classnames(header, className)}>
      <Toolbar>
        <Tooltip title="Open navigation">
          <IconButton className={menuButton} aria-label="Menu" onClick={toggle}>
            <Menu />
          </IconButton>
        </Tooltip>
        <Flex className={expand} alignItems="center">
          <Typography variant="h6" color="inherit">
            {isNotSmallScreen ? startCase(env.appName) : ''}
          </Typography>
          {isNotSmallScreen && isSignedIn && (
            <Flex alignItems="center">
              <Box ml={2} mr={2} fontSize="2.5em">
                |
              </Box>
              <Breadcrumbs />
            </Flex>
          )}
        </Flex>
        <Flex alignItems="center" style={{ position: 'relative' }} mr={2}>
          <Search
            style={{
              position: 'absolute',
              color: theme.palette.primary.dark,
              zIndex: 2,
              left: 10,
            }}
          />
          <Select
            placeholder="Search..."
            options={options}
            value={value}
            onChange={(newValue: unknown) => {
              setValue(newValue as Option);
            }}
            styles={{
              container: provided => ({
                ...provided,
                width: 170,
                color: 'black',
              }),
              control: provided => ({
                ...provided,
                paddingLeft: 30,
              }),
            }}
          />
        </Flex>
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
