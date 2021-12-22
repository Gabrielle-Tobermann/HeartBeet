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
    if ((user !== null && user !== false) && (user && !user.id)) {
      setIsOpen(true);
    }
  }, []);

  const handleSubmit = () => {
    createUser(newUser).then(setUser);
  };

  const handleInputChange = (e) => {
    setNewUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
    <Modal
      toggle={toggle}
      isOpen={isOpen}
    >
      <ModalHeader toggle={toggle}>
        Welcome! Please enter your user information.
      </ModalHeader>
      <ModalBody>
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
            <FormGroup>
        <Label
          for="exampleSelect"
        >
          What will you use HeartBeet for?
        </Label>
          <Input
            id="exampleSelect"
            name="userType"
            type="select"
            onChange={handleInputChange}
          >
            <option value=''></option>
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
