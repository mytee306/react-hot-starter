import React, { FC, useState } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Decrement from './Decrement';
import Increment from './Increment';
import Layout from './Layout';
import { selectCount, State } from './store/reducer';
import {
  Count,
  CountActionCreator,
  decrementBy as createDecrementBy,
  increment as createIncrement,
} from './store/slices/count';

export interface AppProps {
  count: Count;
  increment: CountActionCreator;
  decrementBy: CountActionCreator;
}

const App: FC<AppProps> = ({ count, increment, decrementBy }) => {
  const [amount, setAmount] = useState(1);

  return (
    <section>
      <Layout>
        <section>
          <h1>Count: {count}</h1>
          <Switch>
            <Route
              path="/increment"
              component={() => <Increment increment={increment} />}
            />
            <Route
              path="/decrement"
              component={() => (
                <Decrement
                  decrementBy={decrementBy}
                  amount={amount}
                  setAmount={setAmount}
                />
              )}
            />
          </Switch>
        </section>
      </Layout>
    </section>
  );
};

export const mapStateToProps = (state: State) => ({
  count: selectCount(state),
});

export const mapDispatchToProps = {
  increment: createIncrement,
  decrementBy: createDecrementBy,
};

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
