/* eslint-disable jsx-a11y/interactive-supports-focus */

import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {
  Build,
  Language,
  Menu,
  Search,
  WbSunny,
  WbSunnyOutlined,
} from '@material-ui/icons';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import clsx from 'clsx';
import { IconButton, Tooltip } from 'components';
import env from 'env';
import { startCase } from 'lodash';
import { CreateSimpleAction, Maybe } from 'models';
import React, { FC } from 'react';
import { connect, useSelector } from 'react-redux';
import Select from 'react-select';
import { Flex } from 'rebass';
import {
  createSetLang,
  createSignout,
  createToggleType,
  Lang,
  selectDictionary,
  selectIsPaletteDark,
  selectLang,
  State,
} from 'store';
import { useActions } from 'utils';
import './Header.scss';

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

interface Language {
  value: Lang;
  label: string;
}

const useStyles = makeStyles(theme => ({
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
}));

export interface HeaderProps {
  toggle: () => void;
  isDark: ReturnType<typeof selectIsPaletteDark>;
  togglePaletteType: CreateSimpleAction;
  className?: string;
}

const Header: FC<HeaderProps> = ({
  toggle,
  isDark,
  togglePaletteType,
  className,
}) => {
  const theme = useTheme();

  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up('md'));

  const [value, setValue] = React.useState<Maybe<Option>>(null);

  const { header, expand, menuButton } = useStyles();

  const white = (base: React.CSSProperties) => ({
    ...base,
    color: theme.palette.common.white,
  });

  const [actionsOpen, setActionsOpen] = React.useState(false);
  const toggleActionsOpen = () => {
    setActionsOpen(!actionsOpen);
  };

  const lang = useSelector(selectLang);
  const dictionary = useSelector(selectDictionary);

  const [langOpen, setLangOpen] = React.useState(false);
  const toggleLangOpen = () => setLangOpen(!langOpen);

  const languages: Language[] = [
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'de',
      label: 'German',
    },
  ];

  const { setLang } = useActions({ setLang: createSetLang });

  return (
    <AppBar position="static" className={clsx(header, className)}>
      <Toolbar>
        <Tooltip title={dictionary.openNavigation}>
          <IconButton className={menuButton} aria-label="Menu" onClick={toggle}>
            <Menu />
          </IconButton>
        </Tooltip>
        <Flex className={expand} alignItems="center">
          <Typography variant="h6" color="inherit">
            {isNotSmallScreen ? startCase(env.appName) : ''}
          </Typography>
          {/* {isNotSmallScreen && isSignedIn && (
            <Flex alignItems="center">
              <Box ml={2} mr={2} fontSize="2.5em">
                |
              </Box>
              <Breadcrumbs />
            </Flex>
          )} */}
        </Flex>
        <Flex
          alignItems="center"
          style={{ position: 'relative' }}
          mr={2}
          width={[150, 250]}
        >
          <Search
            style={{
              position: 'absolute',
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
              container: base => ({
                ...base,
                flexGrow: 1,
              }),
              control: base => ({
                ...base,
                paddingLeft: 30,
                border: 'none',
                backgroundColor: theme.palette.primary.light,
              }),
              singleValue: white,
              input: white,
              dropdownIndicator: white,
              placeholder: white,
            }}
          />
        </Flex>
        <div
          onClick={toggleActionsOpen}
          onKeyDown={toggleActionsOpen}
          role="button"
        >
          <SpeedDial
            ariaLabel="Actions"
            icon={<Build />}
            open={actionsOpen}
            onMouseEnter={() => setActionsOpen(true)}
            onMouseLeave={() => setActionsOpen(false)}
            direction="down"
            style={{
              position: 'relative',
              margin: 10,
              cursor: 'pointer',
            }}
          >
            <SpeedDialAction
              tooltipTitle="Toggle light"
              icon={isDark ? <WbSunny color="primary" /> : <WbSunnyOutlined />}
              onClick={() => togglePaletteType()}
            />
          </SpeedDial>
        </div>
        <div onClick={toggleLangOpen} onKeyDown={toggleLangOpen} role="button">
          <SpeedDial
            ariaLabel="Language"
            icon={<Language />}
            open={langOpen}
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
            direction="down"
          >
            {languages.map(({ value: language, label }) => (
              <SpeedDialAction
                key={language}
                tooltipTitle={label}
                icon={
                  <Typography
                    color={lang === language ? 'secondary' : 'primary'}
                  >
                    {language}
                  </Typography>
                }
                onClick={() => setLang(language)}
              />
            ))}
          </SpeedDial>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: State) => ({
  isDark: selectIsPaletteDark(state),
});

const mapDispatchToProps = {
  togglePaletteType: createToggleType,
  signOut: createSignout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
