// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAztRF2Jit5GV3YG7L5Ik6FoqQnT4QRrbg",
  authDomain: "safezone-6cef7.firebaseapp.com",
  projectId: "safezone-6cef7",
  storageBucket: "safezone-6cef7.appspot.com",
  messagingSenderId: "149405370525",
  appId: "1:149405370525:web:dcf6c31dafd7e81c89ac74",
  measurementId: "G-5DGM8YF31F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app)

export const auth = getAuth();

const FirebaseInfo = { firebaseConfig: firebaseConfig, app: app, auth: auth, db: db };
export default FirebaseInfo;