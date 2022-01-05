import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import { addDonation, addItem } from '../../helpers/data/donationsData';
import { getUserLocations } from '../../helpers/data/LocationData';
import { AddDonation, FieldButton } from '../../styles/DonationStyle';

function AddDonationModal({ user, setDonations }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userLocations, setUserLocations] = useState([]);
  const [newDonation, setNewDonation] = useState({});

  useEffect(() => {
    setNewDonation({
      id: uuidv4(),
      isDelivery: false,
      donorId: user.id,
      locationId: '',
      claimed: false,
      received: false
    });
  }, []);

  const [donLocation, setDonLocation] = useState({});

  const [itemInputs, setItemInputs] = useState([
    {
      id: uuidv4(),
      donationId: newDonation.id,
      food: '',
      quantity: '',
      datePrepared: '',
      bestBy: ''
    }]);

  useEffect(() => {
    getUserLocations(user.id).then((resp) => {
      setUserLocations(resp);
    });
  }, []);

  const addNewField = () => {
    setItemInputs([...itemInputs,
      {
        id: uuidv4(),
        donationId: newDonation.id,
        food: '',
        quantity: '',
        datePrepared: '',
        bestBy: ''
      }]);
  };

  const removeField = (id) => {
    const inputs = [...itemInputs];
    inputs.splice(inputs.findIndex((element) => element.id === id));
    setItemInputs(inputs);
  };

  const toggle = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => {
    setNewDonation((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked
    }));
  };

  const handleLocationChange = (e) => {
    const location = userLocations.find((loc) => loc.street === e.target.value);
    setDonLocation(location);
    setNewDonation((prevState) => ({
      ...prevState,
      locationId: location.id,
      donorId: user.id
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDonation(newDonation).then(() => {
      itemInputs.forEach((item) => {
        addItem(item).then(setDonations);
      });
    });
    setDonLocation({});
    setNewDonation({
      id: uuidv4(),
      isDelivery: false,
      donorId: '',
      locationId: '',
      claimed: false,
      received: false
    });
    setItemInputs([
      {
        id: uuidv4(),
        donationId: '',
        food: '',
        quantity: '',
        datePrepared: '',
        bestBy: ''
      }]);
    setIsOpen(!isOpen);
  };

  const handleItemInputChange = (id, e) => {
    const newInputs = itemInputs.map((element) => {
      if (id === element.id) {
        const el = element;
        el[e.target.name] = e.target.value;
        el.donationId = newDonation.id;
      }
      return element;
    });
    setItemInputs(newInputs);
  };

  return (
    <div>
         <AddDonation onClick={toggle}>Add a donation</AddDonation>
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
        value={newDonation.isDelivery}
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
          onChange={handleLocationChange}
          value={donLocation.street}
        >
          <option>Select a location</option>
          {
            userLocations?.map((loc, i) => (
              loc.softDelete === false
                ? <option key={i}>{loc.street}</option>
                : null
            ))
          }
        </Input>
        </FormGroup>
        <div>
        {
          itemInputs.map((item) => (
            <div key={item.id}>
              <FormGroup>
                <Label for="item">What food are you donating?</Label>
                <Input type="text"
                name="food"
                id={item.id}
                value={item.food}
                onChange={(e) => handleItemInputChange(item.id, e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="item">Quantity</Label>
                <Input type="text"
                name="quantity"
                id={item.id}
                value={item.quantity}
                onChange={(e) => handleItemInputChange(item.id, e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="item">When was it prepared?</Label>
                <Input type="date"
                name="datePrepared"
                id={item.id}
                value={item.datePrepared}
                onChange={(e) => handleItemInputChange(item.id, e)}
                />
                </FormGroup>
                 <FormGroup>
                    <Label for="item">Best by?</Label>
                    <Input type="date"
                    name="bestBy"
                    id={item.id}
                    value={item.bestBy}
                    onChange={(e) => handleItemInputChange(item.id, e)}
                    />
              </FormGroup>
              <FieldButton onClick={addNewField}>+</FieldButton>
              <FieldButton onClick={removeField}>-</FieldButton>
            </div>
          ))
        }
      </div>
      </ModalBody>
      <ModalFooter>
        <AddDonation
          onClick={handleSubmit}
          type='submit'
        >
          Submit
        </AddDonation>
      </ModalFooter>
    </Modal>
    </div>
  );
}

AddDonationModal.propTypes = {
  user: PropTypes.any,
  setDonations: PropTypes.func,
};

export default AddDonationModal;
