import { Typography, withTheme, WithTheme } from '@material-ui/core';
import { Breadcrumbs as MaterialBreadcrumbs } from '@material-ui/lab';
import { BreadcrumbsProps as MaterialBreadcrumbsProps } from '@material-ui/lab/Breadcrumbs';
import { startCase } from 'lodash';
import { head, init, last } from 'ramda';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import urlJoin from 'url-join';
import { rootPaths } from '../App/Routes';
import Link from '../components/Link';
import { selectSignedInFlag, State } from '../store/reducer';
import { AuthState } from '../store/slices/auth';

export interface BreadcrumbsProps
  extends MaterialBreadcrumbsProps,
    RouteComponentProps,
    WithTheme {
  className: string;
  isSignedIn: AuthState['loading'];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  location: { pathname },
  className,
  isSignedIn,
  theme,
}) => {
  const pathnames = pathname.split('/').filter(Boolean);
  const formattedPathnames = pathnames.map(startCase);

  const rootPath = head(pathnames);

  const disabled = rootPath && !Object.keys(rootPaths).includes(rootPath);

  const color = disabled ? theme.palette.error.dark : 'inherit';

  return (
    <MaterialBreadcrumbs className={className} separator="›">
      <Link to="/" disabled={!isSignedIn}>
        Dashboard
      </Link>
      {init(formattedPathnames).map(name => (
        <Link
          key={name}
          to={urlJoin('/', name)}
          disabled={!!disabled}
          style={{ color }}
        >
          {name}
        </Link>
      ))}
      <Typography style={{ color }}>{last(formattedPathnames)}</Typography>
    </MaterialBreadcrumbs>
  );
};

export default connect((state: State) => ({
  isSignedIn: selectSignedInFlag(state),
}))(withRouter(withTheme()(Breadcrumbs)));
