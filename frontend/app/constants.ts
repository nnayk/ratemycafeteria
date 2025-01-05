import exp from 'constants';
import { initializeApp } from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,  
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN, 
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);

export const SCHOOLS = [
    {
        "name":"Cal Poly San Luis Obispo",
        "city":"San Luis Obispo",
        "state":"CA",
        "first_cafe":"Vista Grande",
        "review_count":0,
    },
    {
        "name":"Vanderbilt University",
        "city":"Nashville",
        "state":"TN",
        "first_cafe":"Commons",
        "review_count":0,
    }

];
