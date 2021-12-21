import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import { getSingleLocation, updateLocation } from '../../helpers/data/LocationData';

function EditLocationModal({ locationId, setUserLocations }) {
  const [location, setLocation] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    getSingleLocation(locationId).then((resp) => setLocation(resp));
  }, []);

  const handleInputChange = (e) => {
    setLocation((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = () => {
    updateLocation(location.userId, locationId, location).then(setUserLocations);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <i onClick={toggle} className="fas fa-pen"></i>
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
            value={location.street}
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
            value={location.city}
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
            value={location.state}
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
            value={location.zip}
          />
        </FormGroup>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
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

EditLocationModal.propTypes = {
  locationId: PropTypes.string,
  setUserLocations: PropTypes.func
};

export default EditLocationModal;
