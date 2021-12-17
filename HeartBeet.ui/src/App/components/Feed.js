import React, { useState, useEffect } from 'react';
import { getDonations } from '../../helpers/data/donationsData';
import DonationCard from './DonationCard';

function Feed() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    getDonations().then(setDonations);
  }, []);

  console.warn(donations);
  return (
    <div>
      {
      donations?.map((donation, i) => (
        <DonationCard
        key={i}
        isDelivery={donation.isDelivery}
        donorId={donation.donorId}
        donationId={donation.id}
        datePosted={donation.datePosted}
        claimed={donation.claimed}
        />
      ))
      }
    </div>
  );
}

export default Feed;
