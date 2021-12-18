import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getUser = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${userId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/uid/${uid}`)
    .then((resp) => resolve(resp.data))
    .catch((error) => reject(error));
});

const createUser = (user) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/users/`, user)
    .then((resp) => resolve(resp.data))
    .catch((error) => reject(error));
});

export { getUser, getUserByUid, createUser };
