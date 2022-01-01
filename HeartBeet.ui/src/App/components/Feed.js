import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { getDonations } from '../../helpers/data/donationsData';
import DonationCard from './DonationCard';
import AddDonationModal from './AddDonationModal';

function Feed({ user }) {
  const [donations, setDonations] = useState([]);
  const [toastInfo, setToastInfo] = useState({});

  useEffect(() => {
    getDonations().then(setDonations);
  }, []);

  console.warn('toastInfo', toastInfo);

  return (
    <div>
      <AddDonationModal
        userId={user.id}
        setDonations={setDonations}
        />
        {
          toastInfo.street && <div className="p-3 my-2 rounded">
          <Toast>
            <ToastHeader>
              Donation claimed!
            </ToastHeader>
            <ToastBody>
              {
                toastInfo.isDelivery
                  ? <div>This donation will be delivered at {toastInfo.street} {toastInfo.city}, {toastInfo.state} {toastInfo.zip}</div>
                  : <div>You can pick up this donation at {toastInfo.street} {toastInfo.city}, {toastInfo.state} {toastInfo.zip}</div>
              }
            </ToastBody>
          </Toast>
        </div>
        }
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
          setToastInfo={setToastInfo}
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
