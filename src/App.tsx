import React, { SFC } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import './App.css';
import { State } from './store/reducer';
import {
  Count,
  getCount,
  increment as incrementCreator,
} from './store/reducer/count';

export interface AppProps {
  count: Count;
  increment: SliceActionCreator<void | number>;
}

const App: SFC<AppProps> = ({ count, increment }) => (
  <section className="App">
    <h1>React hot loader</h1>
    <p>Count: {count}</p>
    <button onClick={() => increment()} type="button">
      Increment
    </button>
  </section>
);

export const mapStateToProps = (state: State) => ({
  count: getCount(state),
});

export default hot(module)(
  connect(
    mapStateToProps,
    { increment: incrementCreator },
  )(App as any), // void & number instead of void | number
);
