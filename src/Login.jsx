import { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/auth';

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const login = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      const currentUser = firebase.auth().currentUser;
      setUser(currentUser);
      // Send token to server
      //seguir probando con esta, cambiar nombre a register
      const token = await currentUser.getIdToken();
      await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!user ? (
        <button onClick={login}>Login with Firebase</button>
      ) : (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;



