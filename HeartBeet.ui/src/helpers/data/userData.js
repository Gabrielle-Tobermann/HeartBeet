import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getUser = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${userId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getUser;
