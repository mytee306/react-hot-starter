import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

export interface AppProps {}
export interface AppState {
  count: number;
}

class App extends Component<AppProps, AppState> {
  state = {
    count: 0,
  };

  render() {
    const {
      state: { count },
    } = this;

    return (
      <div className="App">
        <h1>React hot loader </h1>
        <p>Count: {count}</p>
        <button
          onClick={() =>
            this.setState(({ count: _count }) => ({ count: _count + 1 }))
          }
          type="button"
        >
          Increment
        </button>
      </div>
    );
  }
}

const withEnvironment: { [environment: string]: typeof App } = {
  production: App,
  development: hot(module)(App),
};

export default withEnvironment[process.env.NODE_ENV];
