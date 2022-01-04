import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { getDonations } from '../../helpers/data/donationsData';
import DonationCard from './DonationCard';
import AddDonationModal from './AddDonationModal';
import { CardContainer, DonationWrapper } from '../../styles/DonationStyle';

function Feed({ user }) {
  const [donations, setDonations] = useState([]);
  const [toastInfo, setToastInfo] = useState({});
  const [toastOpen, setToastOpen] = useState(true);

  const toggle = () => setToastOpen(!toastOpen);

  useEffect(() => {
    getDonations().then(setDonations);
  }, []);

  return (
    <DonationWrapper>
      <AddDonationModal
        userId={user.id}
        setDonations={setDonations}
        />
        {
          toastInfo.street && <div className="p-3 my-2 rounded">
          <Toast isOpen={toastOpen}>
            <ToastHeader toggle={toggle}>
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
        <CardContainer>
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
        </CardContainer>
    </DonationWrapper>
  );
}

Feed.propTypes = {
  user: PropTypes.any
};

export default Feed;
