import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import Navbar from './components/Navbar';
import { getUserByUid } from '../helpers/data/userData';

function App() {
  const [user, setUser] = useState({});

  console.warn(user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo) {
        // eslint-disable-next-line no-undef
        userInfo.getIdToken().then((token) => sessionStorage.setItem('token', token))
          .then(getUserByUid(userInfo.uid).then(setUser));

        console.warn(user);
      } else {
        setUser(false);
      }
    });
  }, []);
  return (
    <div className='App'>
        <Router>
        <div>
          <Navbar/>
        </div>
      <div style={{ width: '80%' }}>
          <Routes
          user={user}/>
      </div>
      </Router>
    </div>
  );
}

export default App;
