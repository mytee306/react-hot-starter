import LogRocket from 'logrocket';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Module } from '../models/Module';
import rootEpic from './epic';
import reducer from './reducer';
import { createGetCount } from './slices/count';

const epicMiddleware = createEpicMiddleware();

const epic$ = new BehaviorSubject(rootEpic);

const hotReloadingEpic = (...args: Parameters<typeof rootEpic>) =>
  epic$.pipe(switchMap(epic => epic(...args)));

const middleware = [...getDefaultMiddleware(), epicMiddleware];

export default () => {
  if (process.env.NODE_ENV === 'development') {
    const store = configureStore({
      reducer,
      middleware: middleware.concat(logger),
    });

    epicMiddleware.run(hotReloadingEpic);

    (module as Module).hot.accept('./reducer', () => {
      store.replaceReducer(reducer);
    });

    (module as Module).hot.accept('./epic', () => {
      epic$.next(rootEpic);

      store.dispatch(createGetCount());
    });

    return store;
  } else {
    const store = configureStore({
      reducer,
      middleware: middleware.concat(LogRocket.reduxMiddleware()),
    });

    epicMiddleware.run(rootEpic);

    return store;
  }
};
