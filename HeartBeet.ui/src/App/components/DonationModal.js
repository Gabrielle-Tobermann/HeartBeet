import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { claimDonation, getSingleDonation } from '../../helpers/data/donationsData';

function DonationModal({
  name,
  items,
  donationId,
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
    claimDonation(donationId).then((resp) => {
      console.warn(resp);
      setDonation(resp);
    });
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
              {item.datePrepared}
            </div>
            <div>
              {item.bestBy}
            </div>
            <div>
              {donation.claimed ? 'Claimed' : 'Unclaimed'}
            </div>
            </div>
        ))
      }
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={claim}
      >
        Claim Donation
      </Button>
      {' '}
      <Button onClick={function noRefCheck() {}}>
        Mark as Recevied
      </Button>
    </ModalFooter>
  </Modal>
    </div>
  );
}

DonationModal.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
  donationId: PropTypes.string
};

export default DonationModal;
