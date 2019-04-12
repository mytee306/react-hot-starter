import { configureStore } from 'redux-starter-kit';
import reducer from './reducer';

export default () => {
  const store = configureStore({ reducer });

  if (process.env.NODE_ENV !== 'production') {
    (module as any).hot.accept('./reducer', () =>
      store.replaceReducer(reducer),
    );
  }

  return store;
};
