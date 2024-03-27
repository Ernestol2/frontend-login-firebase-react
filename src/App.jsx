import { useState, useEffect } from 'react';
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import PostForm from './PostForm';
import './App.css';

// Import getUserToken function
import { getUserToken } from './firebase';

function App() {
  const [email, setEmail] = useState("");
  const [idToken, setIdToken] = useState(null);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result.user.email);
      setEmail(result.user.email);
      localStorage.setItem("email", result.user.email);
    });
  };

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  // Call getUserToken and set the ID token when the user is signed in
  useEffect(() => {
    if (email) {
      getUserToken().then(token => {
        setIdToken(token);
      }).catch(error => {
        console.error('Error getting user token:', error);
      });
    }
  }, [email]);

  return (
    <>
      <div className='video-card'>
        {/* 
        <iframe src="https://player.vimeo.com/video/892389795?h=578ef32c6d" width="540" height="300" allowFullScreen></iframe>
        <iframe width="540" height="300" src="https://www.youtube.com/embed/Ur-T55-0WVU" allowfullscreen></iframe> 
        */}
      </div>
      {email ? <PostForm idToken={idToken} /> : <button onClick={handleClick}>Sign in with Google</button>}
    </>
  );
}

export default App;





