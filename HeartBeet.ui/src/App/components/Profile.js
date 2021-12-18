import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { getUserLocations } from '../../helpers/data/LocationData';
import LocationTable from './LocationTable';

function Profile({ user }) {
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    if (user.id) {
      getUserLocations(user.id).then(setUserLocations);
    }
  }, []);

  // const handleAdd = () => {
  //   addLocation()
  // }

  return (
    <div>
      <div>{user.name}</div>
      <Button>Add a location</Button>
      <LocationTable
      locations={userLocations}
      />
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.any
};

export default Profile;
