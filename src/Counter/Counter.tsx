import { Card, CardActions, CardHeader } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { match, Route, Switch } from 'react-router-dom';
import urlJoin from 'url-join';
import Loader from '../components/Loader';
import { CreateSimpleAction } from '../models/actions';
import { State } from '../store/reducer';
import {
  CountState,
  createDecrementBy,
  CreateDecrementBy,
  createGetCount,
  createIncrement,
  selectCount,
  selectCountLoadingFlag,
} from '../store/slices/countSlice';
import Decrement from './Decrement';
import Increment from './Increment';

export interface CountProps {
  count: CountState['count'];
  isLoading: CountState['isLoading'];
  increment: CreateSimpleAction;
  decrementBy: CreateDecrementBy;
  match: match;
  getCount: CreateSimpleAction;
}

const Counter: FC<CountProps> = ({
  match: { path },
  count,
  isLoading,
  increment,
  decrementBy,
  getCount,
}) => {
  useEffect(() => {
    getCount();
  }, [getCount]);

  return (
    <Card>
      <CardHeader
        title={
          <>
            Count: <Loader isLoading={isLoading}>{count}</Loader>
          </>
        }
      />
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
    isLoading: selectCountLoadingFlag(state),
  }),
  {
    increment: createIncrement,
    decrementBy: createDecrementBy,
    getCount: createGetCount,
  },
)(Counter);
