import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from 'reactstrap';
import { getItems, getUser } from '../../helpers/data/donationsData';

function DonationCard({
  donationId,
  donorId,
  isDelivery,
}) {
  const [donor, setDonor] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    getUser(donorId).then(setDonor);
  }, []);

  useEffect(() => {
    getItems(donationId).then(setItems);
  }, []);

  console.warn('donor', donor);
  console.warn('items', items);
  return (
    <div>
    <Card
    >
      <CardBody>
        <CardTitle tag="h5">
          {
            donor.name
          }
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
           {
            isDelivery ? 'Delivery' : 'Pickup'
          }
        </CardSubtitle>
        <CardText>
          Some quick example text to build on the card title and make up the bulk of content.
        </CardText>
      </CardBody>
    </Card>
  </div>
  );
}

DonationCard.propTypes = {
  donationId: PropTypes.string,
  donorId: PropTypes.string,
  isDelivery: PropTypes.bool
};

export default DonationCard;
