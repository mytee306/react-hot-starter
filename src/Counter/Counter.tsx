import { Card, CardActions, CardHeader } from '@material-ui/core';
import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import join from 'url-join';
import { CreateSimpleAction } from '../models/actions';
import { selectCount, State } from '../store/reducer';
import {
  Count,
  CreateDecrementByAction,
  createDecrementByAction,
  createIncrementAction,
} from '../store/slices/count';
import Decrement from './Decrement';
import Increment from './Increment';

export interface CountProps {
  count: Count;
  increment: CreateSimpleAction;
  decrementBy: CreateDecrementByAction;
  match: {
    path: string;
  };
}

const Counter: SFC<CountProps> = ({
  match: { path },
  count,
  increment,
  decrementBy,
}) => (
  <Card>
    <CardHeader title={`Count: ${count}`} />
    <CardActions>
      <Switch>
        <Route
          path={join(path, 'increment')}
          component={() => <Increment increment={increment} />}
        />
        <Route
          path={join(path, 'decrement')}
          component={() => <Decrement decrementBy={decrementBy} />}
        />
      </Switch>
    </CardActions>
  </Card>
);

export default connect(
  (state: State) => ({
    count: selectCount(state),
  }),
  {
    increment: createIncrementAction,
    decrementBy: createDecrementByAction,
  },
)(Counter);
