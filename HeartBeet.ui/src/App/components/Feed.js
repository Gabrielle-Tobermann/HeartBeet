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
        donation.received === false && <DonationCard
          key={i}
          isDelivery={donation.isDelivery}
          donorId={donation.donorId}
          recipientId={donation.recipientId || null}
          locationId={donation.locationId}
          donationId={donation.id}
          datePosted={donation.datePosted}
          userId={user.id}
          items={donation.items}
          setDonations={setDonations}
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
