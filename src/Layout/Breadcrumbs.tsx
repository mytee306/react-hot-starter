import {
  Breadcrumbs as MaterialBreadcrumbs,
  withTheme,
  WithTheme,
} from '@material-ui/core';
import { BreadcrumbsProps as MaterialBreadcrumbsProps } from '@material-ui/core/Breadcrumbs';
import { Link } from 'components';
import { startCase } from 'lodash';
import { take } from 'ramda';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Box, Flex } from 'rebass';
import { State } from 'store';
import { RouterState, selectPageFound } from 'store/slices';
import urlJoin from 'url-join';

export interface BreadcrumbsProps
  extends MaterialBreadcrumbsProps,
    RouteComponentProps,
    WithTheme {
  pageFound: RouterState['pageFound'];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  location: { pathname },
  theme,
  pageFound,
}) => {
  const pathnames = pathname.split('/').filter(Boolean);

  const disabled = !pageFound;

  const color = disabled ? theme.palette.error.dark : theme.palette.primary.light;

  return (
    <Flex alignItems="center">
      <Box flex={1}>
        <MaterialBreadcrumbs separator="›">
          <Link to="/" color={color}>
            Dashboard
          </Link>
          {pathnames.map((name, i) => (
            <Link
              key={name}
              to={urlJoin('/', ...take<typeof pathname>(i + 1)(pathnames))}
              disabled={!!disabled}
              color={color}
            >
              {startCase(name)}
            </Link>
          ))}
        </MaterialBreadcrumbs>
      </Box>
    </Flex>
  );
};

export default connect((state: State) => ({
  pageFound: selectPageFound(state),
}))(withRouter(withTheme(Breadcrumbs)));
