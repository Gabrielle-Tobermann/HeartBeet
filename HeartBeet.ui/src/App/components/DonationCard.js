import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap';
import { getItems } from '../../helpers/data/donationsData';
import DonationModal from './DonationModal';
import { getUser } from '../../helpers/data/userData';

function DonationCard({
  donationId,
  donorId,
  isDelivery,
  datePosted,
  claimed,
  userId
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
            claimed={claimed}
            donationId={donationId}
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
          {
            userId === donorId
              ? <Button>Delete</Button>
              : ''
          }
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
  claimed: PropTypes.bool,
  datePosted: PropTypes.string,
  userId: PropTypes.string
};

export default DonationCard;
