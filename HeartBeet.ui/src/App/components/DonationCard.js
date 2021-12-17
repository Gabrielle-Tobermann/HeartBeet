import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import { getItems, getUser } from '../../helpers/data/donationsData';
import DonationModal from './DonationModal';

function DonationCard({
  donationId,
  donorId,
  isDelivery,
  datePosted,
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
      {
        items.length > 0
          ? <Card
        >
          <CardBody>
            <DonationModal
            name={donor.name}
            items={items}
            />
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
               {
                isDelivery ? 'Delivery' : 'Pickup'
              }
            </CardSubtitle>
              {
                items?.map((item, i) => (
                  <CardText key={i}>
                    {item.food}
                </CardText>
                ))
              }
              <div>
                {datePosted}
              </div>
          </CardBody>
        </Card>
          : ''
      }
  </div>
  );
}

DonationCard.propTypes = {
  donationId: PropTypes.string,
  donorId: PropTypes.string,
  isDelivery: PropTypes.bool,
  datePosted: PropTypes.string,
};

export default DonationCard;
