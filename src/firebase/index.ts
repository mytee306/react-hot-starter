import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import env from '../.env';

const { firebaseConfig } = env;

export const init = () => initializeApp(firebaseConfig);
