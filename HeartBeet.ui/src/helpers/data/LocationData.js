import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getUserLocations = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/locations/user/${userId}`)
    .then((resp) => {
      if (resp.data) {
        resolve(Object.values(resp.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const addLocation = (userId, location) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/locations`, location)
    .then(() => {
      getUserLocations(userId).then((resp) => resolve(resp));
    })
    .catch((error) => reject(error));
});

const deleteLocation = (locationId, userId) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/locations/delete/${locationId}`)
    .then(() => {
      getUserLocations(userId).then((resp) => resolve(resp));
    }).catch((error) => reject(error));
});

const updateLocation = (userId, locationId, locationObj) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/locations/${locationId}`, locationObj)
    .then(() => {
      getUserLocations(userId).then((resp) => resolve(resp));
    }).catch((error) => reject(error));
});

const getSingleLocation = (locationId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/locations/${locationId}`)
    .then((resp) => resolve(resp.data))
    .catch((error) => reject(error));
});

export {
  getUserLocations,
  addLocation,
  deleteLocation,
  updateLocation,
  getSingleLocation
};
