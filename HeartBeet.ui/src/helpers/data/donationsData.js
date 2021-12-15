import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getDonations = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/donations`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getItems = (donationId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/items/${donationId}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getUser = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${userId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export { getDonations, getItems, getUser };
