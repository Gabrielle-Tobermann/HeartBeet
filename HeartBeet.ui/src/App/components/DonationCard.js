import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap';
import DonationModal from './DonationModal';
import { getUser } from '../../helpers/data/userData';
import { deleteDonation } from '../../helpers/data/donationsData';
import { getSingleLocation } from '../../helpers/data/LocationData';

function DonationCard({
  donationId,
  donorId,
  isDelivery,
  datePosted,
  userId,
  items,
  locationId,
  setDonations,
  setToastInfo
}) {
  const [donor, setDonor] = useState({});
  const [location, setLocation] = useState({});

  useEffect(() => {
    getUser(donorId).then(setDonor);
  }, []);

  useEffect(() => {
    getSingleLocation(locationId).then(setLocation);
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteDonation(donationId).then(setDonations);
  };

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
            donationId={donationId}
            donorId={donor.id}
            userId={userId}
            setDonations={setDonations}
            setToastInfo={setToastInfo}
            location={location}
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
                {
                  location
                    ? <div>
                      <div>Location:</div>
                      <div>{location?.street}</div>
                      <div>{location?.city}</div>
                      <div>{location.state}</div>
                      <div>{location.zip}</div>
                    </div>
                    : ''
                }
          </CardBody>
          {
            userId === donorId
              ? <Button onClick={handleDelete}>Delete</Button>
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
  datePosted: PropTypes.string,
  userId: PropTypes.string,
  items: PropTypes.array,
  setDonations: PropTypes.func,
  locationId: PropTypes.string,
  setToastInfo: PropTypes.func
};

export default DonationCard;
