import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getUserLocations = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/locations/user/${userId}`)
    .then((resp) => {
      if (resp.data) {
        resolve(resp.data);
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const addLocation = (userId, location) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/locations`, location)
    .then(() => {
      getUserLocations(userId).then((resp) => resolve(resp.data));
    })
    .catch((error) => reject(error));
});

export { getUserLocations, addLocation };
