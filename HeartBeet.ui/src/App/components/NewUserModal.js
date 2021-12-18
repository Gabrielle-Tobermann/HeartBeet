import React, { useEffect, useState } from 'react';
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
import PropTypes from 'prop-types';
import { createUser } from '../../helpers/data/userData';

function NewUserModal({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newUser, setNewUser] = useState(user
    ? {
      email: user.email || null,
      uid: user.uid || null,
      name: '',
      userType: ''
    }
    : {});

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (user && user.id === null) {
      setIsOpen(true);
    }
  }, []);

  const handleSubmit = () => {
    createUser(newUser).then(setUser);
  };

  const handleInputChange = (e) => {
    setNewUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.name === 'userType' ? e.target.checked : e.target.value
    }));
  };

  return (
    <div>
    <Modal
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>
        Welcome! Please enter your user information.
      </ModalHeader>
      <ModalBody>
            <FormGroup>
        <Label
          for="exampleSelect"
        >
          What will you use HeartBeet for?
        </Label>
        <FormGroup>
          <Label for="userName">
            Enter your name or the name of your company
          </Label>
          <Input
            required
            id="userName"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
          />
        </FormGroup>
          <Input
            id="exampleSelect"
            name="userType"
            type="select"
            onChange={handleInputChange}
          >
            <option>
              Donor
            </option>
            <option>
              Recepient
            </option>
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

NewUserModal.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};

export default NewUserModal;
