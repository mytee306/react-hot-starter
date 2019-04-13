import React, { SFC, useState } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import './App.css';
import Decrement from './Decrement';
import Increment from './Increment';
import { selectCount, State } from './store/reducer';
import {
  Count,
  CountPayload,
  decrementBy as createDecrementBy,
  increment as createIncrement,
} from './store/slices/count';

export interface AppProps {
  count: Count;
  increment: SliceActionCreator<CountPayload>;
  decrementBy: SliceActionCreator<CountPayload>;
}

const App: SFC<AppProps> = ({ count, increment, decrementBy }) => {
  const [amount, setAmount] = useState(0);

  return (
    <section className="App">
      <header>
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li>
              <NavLink to="/increment">Increment</NavLink>
            </li>
            <li>
              <NavLink to="/decrement">Decrement</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Count: {count}</h1>
        <Switch>
          <Route
            path="/increment"
            component={() => <Increment increment={increment as any} />}
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
      </main>
    </section>
  );
};

export const mapStateToProps = (state: State) => ({
  count: selectCount(state),
});

export default hot(module)(
  connect(
    mapStateToProps,
    { increment: createIncrement, decrementBy: createDecrementBy },
  )(App),
);
