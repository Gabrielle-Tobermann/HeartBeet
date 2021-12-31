import firebase from 'firebase';
import axios from 'axios';

axios.interceptors.request.use((request) => {
  // eslint-disable-next-line no-undef
  const token = sessionStorage.getItem('token');
  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, (err) => Promise.reject(err));

const signInUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
  provider.setCustomParameters({
    prompt: 'select_account'
  });
};

const signOutUser = () => new Promise((resolve, reject) => {
  firebase.auth().signOut().then(resolve).catch(reject);
});

export { signInUser, signOutUser };
