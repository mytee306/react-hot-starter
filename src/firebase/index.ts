import { initializeApp } from 'firebase/app';
import env from '../.env';

const { firebaseConfig } = env;

export const init = () => initializeApp(firebaseConfig);
