import { Typography } from '@material-ui/core';
import { Breadcrumbs as MaterialBreadcrumbs } from '@material-ui/lab';
import { startCase } from 'lodash';
import { init, last } from 'ramda';
import React, { FC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import urlJoin from 'url-join';
import Link from '../components/Link';

const Breadcrumbs: FC<RouteComponentProps & { className: string }> = ({
  location: { pathname },
  className,
}) => {
  const pathnames = pathname
    .split('/')
    .filter(Boolean)
    .map(startCase);

  return (
    <MaterialBreadcrumbs className={className} separator="›">
      <Link to="/">
        Dashboard
      </Link>
      {init(pathnames).map(name => (
        <Link key={name} to={urlJoin('/', name)}>
          {name}
        </Link>
      ))}
      <Typography>{last(pathnames)}</Typography>
    </MaterialBreadcrumbs>
  );
};

export default withRouter(Breadcrumbs);
