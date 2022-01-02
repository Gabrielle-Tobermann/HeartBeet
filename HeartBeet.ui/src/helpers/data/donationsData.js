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

const addItem = (item) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/items`, item)
    .then(() => getDonations().then((resp) => resolve(resp)))
    .catch((error) => reject(error));
});

const getSingleDonation = (donationId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/donations/${donationId}`)
    .then((resp) => resolve(resp.data))
    .catch((error) => reject(error));
});

const receiveDonation = (donationId) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/donations/receive/${donationId}`)
    .then(() => {
      getDonations().then((resp) => resolve(resp));
    }).catch((error) => reject(error));
});

const claimDonation = (donationId) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/donations/claim/${donationId}`)
    .then(() => {
      getSingleDonation(donationId).then((resp) => resolve(resp));
    })
    .catch((error) => reject(error));
});

const addDonation = (donation) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/donations`, donation)
    .then(() => {
      getDonations().then((resp) => resolve(resp));
    }).catch((error) => reject(error));
});

const updateDonation = (donationId, donation) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/donations/${donationId}`, donation)
    .then((resp) => resolve(resp.data))
    .catch((error) => reject(error));
});

const deleteDonation = (donationId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/donations/${donationId}`)
    .then(() => {
      getDonations().then((resp) => resolve(resp));
    }).catch((error) => reject(error));
});

export {
  getDonations,
  getItems,
  claimDonation,
  getSingleDonation,
  addDonation,
  updateDonation,
  deleteDonation,
  addItem,
  receiveDonation
};
