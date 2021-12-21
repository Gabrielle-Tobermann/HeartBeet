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
import { addDonation } from '../../helpers/data/donationsData';
import { getUserLocations } from '../../helpers/data/LocationData';

function AddDonationModal({ user, setDonations }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userLocations, setUserLocations] = useState(false);

  const [itemInputs, setItemInputs] = useState([{
    itemID: '', id: uuidv4()
  }]);

  const [newDonation, setNewDonation] = useState({
    isDelivery: false,
    donorId: '' || user.id,
    locationId: '',
    deliveryLocationId: '',
  });

  const [items, setItems] = useState([
    {
      donationId: '' || newDonation.id,
      food: '',
      quantity: '',
      datePrepared: '',
      bestBy: ''
    }
  ]);

  useEffect(() => {
    getUserLocations(user.id).then(setUserLocations);
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => {
    setNewDonation((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.type === 'check' ? e.target.checked : e.target.value
    }));
  };

  const handleSubmit = () => {
    addDonation(user.id, newDonation).then(setDonations);
    setIsOpen(!isOpen);
  };
  return (
    <div>
         <Button onClick={toggle}>Add a donation</Button>
       <Modal
      toggle={toggle}
      isOpen={isOpen}
    >
      <ModalHeader toggle={toggle}>
        Add a Donation
      </ModalHeader>
      <ModalBody>
      <FormGroup check>
        <Input
        type="checkbox"
        name="isDelivery"
        onChange={handleInputChange}
        />
        <Label check>
          Are you delivering?
        </Label>
      </FormGroup>
      <FormGroup>
        <Label for="location">
          Where is this donation located?
        </Label>
        <Input
          id="exampleSelect"
          name="locationId"
          type="select"
          onChange={handleInputChange}
        >
          {
            userLocations.map((loc, i) => (
              <option key={i}>{loc.street}, {loc.city}</option>
            ))
          }
        </Input>
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

AddDonationModal.propTypes = {
  user: PropTypes.any,
  setDonations: PropTypes.func
};

export default AddDonationModal;
