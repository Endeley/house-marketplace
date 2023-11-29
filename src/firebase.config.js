// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDnFsESgP1S1fqDsndwwGuW8YS6BRikLRs',
    authDomain: 'house-marketplace-1c0ca.firebaseapp.com',
    projectId: 'house-marketplace-1c0ca',
    storageBucket: 'house-marketplace-1c0ca.appspot.com',
    messagingSenderId: '612788526467',
    appId: '1:612788526467:web:07975c79518ebc665d2ab6',
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

// AIzaSyDnFsESgP1S1fqDsndwwGuW8YS6BRikLRs
