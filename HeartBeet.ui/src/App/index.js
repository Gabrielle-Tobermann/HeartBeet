import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import Navbar from './components/Navbar';
import { getUserByUid } from '../helpers/data/userData';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo) {
        console.warn('userInfo', userInfo);
        // eslint-disable-next-line no-undef
        userInfo.getIdToken().then((token) => sessionStorage.setItem('token', token))
          .then(getUserByUid(userInfo.uid).then((resp) => {
            if (resp) {
              setUser(resp);
            } else {
              setUser(userInfo);
            }
          }));
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className='App'>
        <Router>
        <div>
          <Navbar
          user={user}
          />
        </div>
      <div style={{ width: '80%' }}>
          <Routes
          user={user}
          setUser={setUser}
          />
      </div>
      </Router>
    </div>
  );
}

export default App;
