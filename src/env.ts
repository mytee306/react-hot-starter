const development = {
  firebaseConfig: {
    apiKey: 'AIzaSyDF9z3Z4LO-KP8IqUqV00_2MY-L-YGdbRg',
    authDomain: 'react-hot-starter-dev.firebaseapp.com',
    databaseURL: 'https://react-hot-starter-dev.firebaseio.com',
    projectId: 'react-hot-starter-dev',
    storageBucket: 'react-hot-starter-dev.appspot.com',
    messagingSenderId: '456166678835',
    appId: '1:456166678835:web:a01054c1878394ae',
  },

  appName: 'react hot starter',
};

export type Env = typeof development;

export type AllEnvironments = { [envName in typeof process.env.NODE_ENV]: Env };

const allEnvironments: AllEnvironments = {
  development,
  production: development,
  test: development,
};

export default allEnvironments[process.env.NODE_ENV];
