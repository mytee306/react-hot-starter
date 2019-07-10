import { Switch } from 'components';
import React, { FC } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import urlJoin from 'url-join';
import List from './List';
import Upload from './Upload';

export interface ImagesProps extends RouteComponentProps {}

const Images: FC<ImagesProps> = ({ match: { path } }) => (
  <Switch>
    <Route exact path={urlJoin(path, '/')} component={List} />
    <Route path={urlJoin(path, 'upload')} component={Upload} />
  </Switch>
);

export default Images;
