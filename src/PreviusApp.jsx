import { useState, useEffect } from 'react';
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import PostForm from './PostForm';
import './App.css';

// Import getUserToken function
import { getUserToken } from './firebase';

function PreviusApp() {
  const [value, setValue] = useState("");
  const [idToken, setIdToken] = useState(null);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result.user);
      setValue(result.user.email);
      localStorage.setItem("email", result.user.email);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  // Call getUserToken and set the ID token when the user is signed in
  useEffect(() => {
    if (value) {
      getUserToken().then(token => {
        setIdToken(token);
      }).catch(error => {
        console.error('Error getting user token:', error);
      });
    }
  }, [value]);

  return (
    <>
      {value ? <PostForm idToken={idToken} /> : <button onClick={handleClick}>Sign in with Google</button>}
    </>
  );
}

export default PreviusApp;