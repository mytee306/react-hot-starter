import {
  Breadcrumbs as MaterialBreadcrumbs,
  Typography,
  withTheme,
  WithTheme,
} from '@material-ui/core';
import { BreadcrumbsProps as MaterialBreadcrumbsProps } from '@material-ui/core/Breadcrumbs';
import { Link } from 'components';
import { startCase } from 'lodash';
import { init, last, take } from 'ramda';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
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
  const pathnames = pathname.split('/').filter(Boolean);

  const disabled = !pageFound;

  const color = disabled ? theme.palette.error.dark : 'inherit';

  return (
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
      <Typography style={{ color }}>{startCase(last(pathnames))}</Typography>
    </MaterialBreadcrumbs>
  );
};

export default connect((state: State) => ({
  pageFound: selectPageFound(state),
}))(withRouter(withTheme(Breadcrumbs)));
