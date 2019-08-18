import {
  Breadcrumbs as MaterialBreadcrumbs,
  useTheme,
} from '@material-ui/core';
import { BreadcrumbsProps as MaterialBreadcrumbsProps } from '@material-ui/core/Breadcrumbs';
import { Link } from 'components';
import { startCase } from 'lodash';
import { take } from 'ramda';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Box, Flex } from 'rebass';
import { RouterState, selectPageFound, State } from 'store';
import urlJoin from 'url-join';
import { useIsNotSmallScreen } from 'utils';

export interface BreadcrumbsProps
  extends MaterialBreadcrumbsProps,
    RouteComponentProps {
  pageFound: RouterState['pageFound'];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  location: { pathname },
  pageFound,
}) => {
  const theme = useTheme();

  const pathnames = pathname.split('/').filter(Boolean);

  const pageNotFound = !pageFound;

  const isNotSmallScreen = useIsNotSmallScreen();

  const color = isNotSmallScreen
    ? theme.palette.common.white
    : theme.palette.primary.light;

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
              disabled={pageNotFound}
              color={color}
              style={{
                borderBottom: pageNotFound
                  ? `2px solid ${theme.palette.error.dark}`
                  : 'none',
              }}
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
}))(withRouter(Breadcrumbs));
