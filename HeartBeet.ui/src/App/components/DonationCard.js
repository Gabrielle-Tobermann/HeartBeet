import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CardBody,
} from 'reactstrap';
import DonationModal from './DonationModal';
import { getUser } from '../../helpers/data/userData';
import { deleteDonation } from '../../helpers/data/donationsData';
import { getSingleLocation } from '../../helpers/data/LocationData';
import {
  CardHeader,
  DatePosted,
  Delivery,
  Item,
  Location,
  NameContainer,
  StyledCard
} from '../../styles/DonationStyle';

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
          ? <StyledCard>
          <CardBody>
            <CardHeader>
              <NameContainer>
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
              <Delivery
                className="mb-2 text-muted"
                tag="h6"
              >
                {
                  isDelivery ? 'Delivery' : 'Pickup'
                }
              </Delivery>
              </NameContainer>
              <DatePosted>
                {datePosted.split('T')[0]} {datePosted.split('T')[1].split('.')[0]}
              </DatePosted>
            </CardHeader>
              {
                items?.map((item, i) => (
                  <Item key={i}>
                    {item.food}
                </Item>
                ))
              }
                {
                  location && !isDelivery
                    ? <Location>{location?.street} {location?.city}, {location.state} {location.zip}</Location>
                    : ''
                }
          </CardBody>
          {
            userId === donorId
              ? <i style={{
                padding: '1%',
                cursor: 'pointer',
                width: 'fit-content'
              }}className="fas fa-trash-alt" onClick={handleDelete}></i>
              : ''
          }
        </StyledCard>
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
