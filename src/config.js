import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtHY9DgWh7mFL1CX_jZWfMXtw1mOW_M34",
  authDomain: "login-test-30b9a.firebaseapp.com",
  projectId: "login-test-30b9a",
  storageBucket: "login-test-30b9a.appspot.com",
  messagingSenderId: "365350398956",
  appId: "1:365350398956:web:8654f84d1ac76fc9c86ec9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};
