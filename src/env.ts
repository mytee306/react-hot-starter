const development = {
  firebaseConfig: JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || '{}'),

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
