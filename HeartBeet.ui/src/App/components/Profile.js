import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserLocations } from '../../helpers/data/LocationData';
import LocationTable from './LocationTable';
import AddLocationModal from './AddLocationModal';
import { ProfileHeader, UserType } from '../../styles/ProfileStyle';

function Profile({ user }) {
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    if (user.id) {
      getUserLocations(user.id).then(setUserLocations);
    }
  }, []);

  return (
    <div>
      <ProfileHeader>{user.name}</ProfileHeader>
      <UserType>{user.userType}</UserType>
      <AddLocationModal
      user={user}
      setUserLocations={setUserLocations}
      />
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
