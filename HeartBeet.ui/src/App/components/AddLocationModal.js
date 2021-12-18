import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import { addLocation } from '../../helpers/data/LocationData';

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
      <Button onClick={toggle}>Add a location</Button>
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
      <ModalFooter toggle={toggle}>
        <Button
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
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
