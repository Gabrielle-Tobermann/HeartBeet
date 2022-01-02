import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserLocations } from '../../helpers/data/LocationData';
import LocationTable from './LocationTable';
import AddLocationModal from './AddLocationModal';

function Profile({ user }) {
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    if (user.id) {
      getUserLocations(user.id).then(setUserLocations);
    }
  }, []);

  return (
    <div>
      <div>{user.name}</div>
      <div>{user.userType}</div>
      <AddLocationModal
      user={user}
      setUserLocations={setUserLocations}
      />
      {
        userLocations
          ? <div>Here are all of your current locations: </div>
          : ''
      }
      <LocationTable
      locations={userLocations}
      userId={user.id}
      setUserLocations={setUserLocations}
      />
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.any
};

export default Profile;
