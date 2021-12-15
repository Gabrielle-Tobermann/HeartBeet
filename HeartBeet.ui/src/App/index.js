import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import './App.scss';
import { signInUser, signOutUser } from '../helpers/auth';

function App() {
  const [user, setUser] = useState({});

  console.warn(user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo) {
        // eslint-disable-next-line no-undef
        userInfo.getIdToken().then((token) => sessionStorage.setItem('token', token));
        setUser(userInfo);
      } else {
        setUser(false);
      }
    });
  }, []);
  return (
    <div className='App'>
      <button onClick={signInUser}>Sign In</button>
      <button onClick={signOutUser}>Sign Out</button>
    </div>
  );
}

export default App;
