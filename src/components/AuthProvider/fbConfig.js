import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STOREAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_CONFIG_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_CONFIG_MEASUREMENT_ID
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth()
export const firebaseDb = getFirestore(firebaseApp);