import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  ModalBody
} from 'reactstrap';
import PropTypes from 'prop-types';
import {
  claimDonation,
  getSingleDonation,
  receiveDonation,
  updateDonation
} from '../../helpers/data/donationsData';
import { getUserLocations } from '../../helpers/data/LocationData';
import { CardName, ItemDiv } from '../../styles/DonationStyle';

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
  const [chosenLocation, setChosenLocation] = useState({});
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
    setToastInfo({
      isDelivery: donation.isDelivery,
      street: chosenLocation.street,
      city: chosenLocation.city,
      state: chosenLocation.state,
      zip: chosenLocation.zip
    });
    setConfirmOpen(!confirmOpen);
    setModal(!modal);
    setClaimClicked(!claimClicked);
  };

  const handleLocationChange = (e) => {
    const findLoc = userLocations.find((loc) => loc.street === e.target.value);
    setChosenLocation(findLoc);
    setDonation((prevState) => ({
      ...prevState,
      deliveryLocationId: findLoc.id
    }));
  };

  const receive = () => {
    receiveDonation(donationId).then((resp) => setDonations(resp));
    setModal(!modal);
  };

  return (
    <div>
       <CardName
       className='rounded-pill'
    onClick={toggle}
  >
    {name}
  </CardName>
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
            <ItemDiv>
              {item.food}
            </ItemDiv>
            <ItemDiv>
              {item.quantity}
            </ItemDiv>
            <ItemDiv>
              Date Prepared: {item.datePrepared.split('T')[0]}
            </ItemDiv>
            <ItemDiv>
              Best By: {item.bestBy.split('T')[0]}
            </ItemDiv>
          </div>
        ))
      }
       <ItemDiv>
          {donation.claimed ? 'Claimed' : 'Unclaimed'}
        </ItemDiv>
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
                          loc.softDelete === false
                            ? <option key={j}>
                            {loc.street}
                          </option>
                            : null
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
