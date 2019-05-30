import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default () => {
  const config = process.env.REACT_APP_FIREBASE_CONFIG;

  const parsedConfig = JSON.parse(config || '');

  const app = initializeApp(parsedConfig || {});

  app.firestore().settings({ timestampsInSnapshots: true });

  return app;
};
