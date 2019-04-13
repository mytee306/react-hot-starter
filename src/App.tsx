import React, { SFC, useState } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import './App.css';
import Decrement from './Decrement';
import Increment from './Increment';
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
      </main>
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
