import { initializeApp } from 'firebase/app';
// import firebaseFirestore from 'firebase/firestore';

export default () => {
  const config = process.env.REACT_APP_FIREBASE_CONFIG;
  
  if (config) {
    const parsedConfig = JSON.parse(config);

    if (parsedConfig) {
      initializeApp(parsedConfig);

      // const firestore = firebaseFirestore();

      // firestore.settings({ timestampsInSnapshots: true });
    }
  }
};
