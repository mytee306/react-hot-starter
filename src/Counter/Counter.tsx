import { Card, CardActions, CardHeader } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { match, Route, Switch } from 'react-router-dom';
import urlJoin from 'url-join';
import { CreateSimpleAction } from '../models/actions';
import { State } from '../store/reducer';
import {
  Count,
  createDecrementBy,
  CreateDecrementBy,
  createGetCount,
  createIncrement,
  selectCount,
} from '../store/slices/count';
import Decrement from './Decrement';
import Increment from './Increment';

export interface CountProps {
  count: Count;
  increment: CreateSimpleAction;
  decrementBy: CreateDecrementBy;
  match: match;
  getCount: CreateSimpleAction;
}

const Counter: FC<CountProps> = ({
  match: { path },
  count,
  increment,
  decrementBy,
  getCount,
}) => {
  useEffect(() => {
    getCount();
  }, [getCount]);

  return (
    <Card>
      <CardHeader title={`Count: ${count}`} />
      <CardActions>
        <Switch>
          <Route
            path={urlJoin(path, 'increment')}
            component={() => <Increment increment={increment} />}
          />
          <Route
            path={urlJoin(path, 'decrement')}
            component={() => <Decrement decrementBy={decrementBy} />}
          />
        </Switch>
      </CardActions>
    </Card>
  );
};

export default connect(
  (state: State) => ({
    count: selectCount(state),
  }),
  {
    increment: createIncrement,
    decrementBy: createDecrementBy,
    getCount: createGetCount,
  },
)(Counter);
