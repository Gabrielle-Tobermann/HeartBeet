import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import {
  claimDonation,
  getSingleDonation,
  receiveDonation,
  updateDonation
} from '../../helpers/data/donationsData';
import { getUserLocations } from '../../helpers/data/LocationData';

function DonationModal({
  name,
  items,
  donationId,
  userId,
  donorId,
  setDonations,
  setToastInfo,
  location
}) {
  const [modal, setModal] = useState(false);
  const [claimClicked, setClaimClicked] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [donation, setDonation] = useState({});
  const [userLocations, setUserLocations] = useState([]);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getSingleDonation(donationId).then((response) => {
      setDonation(response);
    });
  }, []);

  useEffect(() => {
    getUserLocations(userId).then(setUserLocations);
  }, []);

  const claim = () => {
    if (donation.isDelivery) {
      setClaimClicked(true);
      setConfirmOpen(true);
    } else {
      setToastInfo({
        isDelivery: donation.isDelivery,
        street: location.street,
        city: location.city,
        state: location.state,
        zip: location.zip
      });
      claimDonation(donationId).then((resp) => setDonation(resp));
    }
  };

  const confirm = () => {
    updateDonation(donationId, donation)
      .then(() => {
        claimDonation(donationId).then((resp) => setDonation(resp));
      });
    setConfirmOpen(!confirmOpen);
    setModal(!modal);
    setClaimClicked(!claimClicked);
  };

  const handleLocationChange = (e) => {
    const chosenLocation = userLocations.find((loc) => loc.street === e.target.value);
    setToastInfo({
      isDelivery: donation.isDelivery,
      street: chosenLocation.street,
      city: chosenLocation.city,
      state: chosenLocation.state,
      zip: chosenLocation.zip
    });
    setDonation((prevState) => ({
      ...prevState,
      deliveryLocationId: chosenLocation.id
    }));
    console.warn(donation);
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
          </div>
        ))
      }
       <div>
          {donation.claimed ? 'Claimed' : 'Unclaimed'}
        </div>
              <div>
              {
                userLocations && claimClicked
                  ? <FormGroup>
                    <Label for="locations">
                      Select a Delivery Location:
                    </Label>
                    <Input
                      id="exampleSelect"
                      name=""
                      type="select"
                      onChange={handleLocationChange}
                    >
                      <option>Select</option>
                      {
                        userLocations.map((loc, j) => (
                          <option key={j}>
                            {loc.street}
                          </option>
                        ))
                      }
                    </Input>
                  </FormGroup>
                  : ''
              }
            </div>
    </ModalBody>
    <ModalFooter>
      {
        userId !== donorId && !donation.claimed && !claimClicked
          ? <Button
              color="primary"
              onClick={claim}
            >
          Claim Donation
        </Button>
          : ''
      }
      {
        confirmOpen && <Button
                        onClick={confirm}
                        >Confirm</Button>
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
  setDonations: PropTypes.func,
  setToastInfo: PropTypes.func,
  location: PropTypes.object
};

export default DonationModal;
