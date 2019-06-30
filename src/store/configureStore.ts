import LogRocket from 'logrocket';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { Module } from '../models/Module';
import epic from './epic';
import reducer from './reducer';

const epicMiddleware = createEpicMiddleware();

const middleware = [...getDefaultMiddleware(), epicMiddleware];

export default () => {
  if (process.env.NODE_ENV === 'development') {
    const store = configureStore({
      reducer,
      middleware: middleware.concat(logger),
    });

    epicMiddleware.run(epic);

    (module as Module).hot.accept('./reducer', () =>
      store.replaceReducer(reducer),
    );

    return store;
  } else {
    const store = configureStore({
      reducer,
      middleware: middleware.concat(LogRocket.reduxMiddleware()),
    });

    epicMiddleware.run(epic);

    return store;
  }
};
