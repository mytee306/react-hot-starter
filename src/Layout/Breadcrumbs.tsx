import {
  Breadcrumbs as MaterialBreadcrumbs,
  Divider,
  Typography,
  withTheme,
  WithTheme,
} from '@material-ui/core';
import { BreadcrumbsProps as MaterialBreadcrumbsProps } from '@material-ui/core/Breadcrumbs';
import { Close } from '@material-ui/icons';
import { IconButton, Link, Tooltip } from 'components';
import { startCase } from 'lodash';
import { init, last, take } from 'ramda';
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
  className: string;
  pageFound: RouterState['pageFound'];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  location: { pathname },
  className,
  theme,
  pageFound,
}) => {
  const [open, setOpen] = React.useState(true);

  const pathnames = pathname.split('/').filter(Boolean);

  const disabled = !pageFound;

  const color = disabled ? theme.palette.error.dark : 'inherit';

  return (
    <>
      {open && (
        <Flex alignItems="center">
          <Box flex={1}>
            <MaterialBreadcrumbs className={className} separator="›">
              <Link to="/">Dashboard</Link>
              {init(pathnames).map((name, i) => (
                <Link
                  key={name}
                  to={urlJoin('/', ...take<typeof pathname>(i + 1)(pathnames))}
                  disabled={!!disabled}
                  color={color}
                >
                  {startCase(name)}
                </Link>
              ))}
              <Typography style={{ color }}>
                {startCase(last(pathnames))}
              </Typography>
            </MaterialBreadcrumbs>
          </Box>
          <Tooltip title="Close breadcrumbs">
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Tooltip>
        </Flex>
      )}
      <Divider />
    </>
  );
};

export default connect((state: State) => ({
  pageFound: selectPageFound(state),
}))(withRouter(withTheme(Breadcrumbs)));
