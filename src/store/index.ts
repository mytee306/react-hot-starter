import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import reducer from './reducer';

export default () => {
  if (process.env.NODE_ENV === 'production') {
    return configureStore({ reducer });
  } else {
    const store = configureStore({
      reducer,
      middleware: [logger, ...getDefaultMiddleware()],
    });

    (module as any).hot.accept('./reducer', () =>
      store.replaceReducer(reducer),
    );

    return store;
  }
};
