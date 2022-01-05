import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import { addLocation } from '../../helpers/data/LocationData';
import { AddDonation } from '../../styles/DonationStyle';

function AddLocationModal({ user, setUserLocations }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newLocation, setNewLocation] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    userId: user.id
  });
  const toggle = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => {
    setNewLocation((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = () => {
    addLocation(user.id, newLocation).then(setUserLocations);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* AddDonation is just the name of styled button */}
      <AddDonation onClick={toggle}>Add a location</AddDonation>
       <Modal
      toggle={toggle}
      isOpen={isOpen}
    >
      <ModalHeader toggle={toggle}>
        Welcome! Please enter your user information.
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="street">
            Street
          </Label>
          <Input
            required
            id="street"
            name="street"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="city">
            City
          </Label>
          <Input
            required
            id="city"
            name="city"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="state">
            State
          </Label>
          <Input
            required
            id="state"
            name="state"
            onChange={handleInputChange}
          />
           <FormGroup>
          <Label for="zip">
            Zip
          </Label>
          <Input
            required
            id="zip"
            name="zip"
            onChange={handleInputChange}
          />
        </FormGroup>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <AddDonation
          onClick={handleSubmit}
        >
          Submit
        </AddDonation>
      </ModalFooter>
    </Modal>
    </div>
  );
}

AddLocationModal.propTypes = {
  user: PropTypes.any,
  setUserLocations: PropTypes.func
};

export default AddLocationModal;
