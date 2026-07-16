import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-dee9f.firebaseapp.com",
  projectId: "interviewiq-dee9f",
  storageBucket: "interviewiq-dee9f.firebasestorage.app",
  messagingSenderId: "903582672020",
  appId: "1:903582672020:web:8df209152d54ff297d8081"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


export { auth, provider};
