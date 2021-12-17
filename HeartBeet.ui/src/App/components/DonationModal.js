import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';
import PropTypes from 'prop-types';

function DonationModal({
  name,
  items,
}) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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
            </div>
        ))
      }
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={function noRefCheck() {}}
      >
        Do Something
      </Button>
      {' '}
      <Button onClick={function noRefCheck() {}}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
    </div>
  );
}

DonationModal.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array
};

export default DonationModal;
