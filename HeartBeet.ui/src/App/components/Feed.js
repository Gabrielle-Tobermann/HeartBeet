import React, { useState, useEffect } from 'react';
import getDonations from '../../helpers/data/donationsData';

function Feed() {
  const [donations, setDonations] = useState([]);
  useEffect(() => {
    getDonations().then(setDonations);
  }, []);

  console.warn(donations);
  return (
    <div>
      Feed
    </div>
  );
}

export default Feed;
