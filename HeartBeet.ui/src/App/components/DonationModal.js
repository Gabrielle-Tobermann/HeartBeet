import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { claimDonation, getSingleDonation, receiveDonation } from '../../helpers/data/donationsData';
// import { getSingleLocation } from '../../helpers/data/LocationData';

function DonationModal({
  name,
  items,
  donationId,
  userId,
  donorId,
  setDonations,
}) {
  const [modal, setModal] = useState(false);
  const [donation, setDonation] = useState({});
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getSingleDonation(donationId).then((response) => {
      setDonation(response);
    });
  }, []);

  const claim = () => {
    claimDonation(donationId).then((resp) => setDonation(resp));
    setModal(!modal);
  };

  const receive = () => {
    receiveDonation(donationId).then((resp) => setDonations(resp));
    setModal(!modal);
  };

  return (
    <div>
       <Button
    color="danger"
    onClick={toggle}
  >
    {name}
  </Button>
        <Modal
    isOpen={modal} toggle={toggle}
  >
    <ModalHeader toggle={toggle}>
      {name}
    </ModalHeader>
    <ModalBody>
      {
        items.map((item, i) => (
          <div key={i}>
            <div>
              {item.food}
            </div>
            <div>
              {item.quantity}
            </div>
            <div>
              Date Prepared: {item.datePrepared}
            </div>
            <div>
              Best By: {item.bestBy}
            </div>
            <div>
              {donation.claimed ? 'Claimed' : 'Unclaimed'}
            </div>
            {/* <div>
              <div>{location?.street} {location?.city}</div>
            </div> */}
            </div>
        ))
      }
    </ModalBody>
    <ModalFooter>
      {
        userId !== donorId && !donation.claimed
          ? <Button
              color="primary"
              onClick={claim}
            >
          Claim Donation
        </Button>
          : ''
      }
      {
        userId === donation.recipientId
          ? <Button
              onClick={receive}
              >
              Mark as Received
            </Button>
          : ''
      }
    </ModalFooter>
  </Modal>
    </div>
  );
}

DonationModal.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
  donationId: PropTypes.string,
  recipientId: PropTypes.string,
  donorId: PropTypes.string,
  userId: PropTypes.string,
  claimed: PropTypes.bool,
  setDonations: PropTypes.func
};

export default DonationModal;
