import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDonations } from '../../helpers/data/donationsData';
import DonationCard from './DonationCard';
import AddDonationModal from './AddDonationModal';

function Feed({ user }) {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    getDonations().then(setDonations);
  }, []);

  return (
    <div>
      <AddDonationModal
        userId={user.id}
        setDonations={setDonations}
        />
      {
      donations?.map((donation, i) => (
        <DonationCard
        key={i}
        isDelivery={donation.isDelivery}
        donorId={donation.donorId}
        donationId={donation.id}
        datePosted={donation.datePosted}
        claimed={donation.claimed}
        userId={user.id}
        />
      ))
      }
    </div>
  );
}

Feed.propTypes = {
  user: PropTypes.any
};

export default Feed;
