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

const getSingleDonation = (donationId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/donations/${donationId}`)
    .then((resp) => resolve(resp))
    .catch((error) => reject(error));
});

const claimDonation = (donationId) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/donations/claim/${donationId}`)
    .then((resp) => resolve(resp))
    .catch((error) => reject(error));
});

export {
  getDonations,
  getItems,
  claimDonation,
  getSingleDonation
};
