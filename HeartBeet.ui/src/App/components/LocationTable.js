import PropTypes from 'prop-types';
import React from 'react';
import { deleteLocation } from '../../helpers/data/LocationData';
import { StyledTable } from '../../styles/ProfileStyle';
import EditLocationModal from './EditLocationModal';

function LocationTable({ locations, userId, setUserLocations }) {
  const handleDelete = (locationId) => {
    deleteLocation(locationId, userId).then(setUserLocations);
  };
  return (
    <div>
        <StyledTable>
        <thead>
          <tr>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            locations.map((location, i) => (
              location.softDelete
                ? null
                : <tr key={i}>
                <td>{location.street}</td>
                <td>{location.city}</td>
                <td>{location.state}</td>
                <td>{location.zip}</td>
                <td><EditLocationModal
                      locationId={location.id}
                      setUserLocations={setUserLocations}
                      />
                </td>
                <td onClick={() => handleDelete(location.id)}><i className="far fa-trash-alt"></i></td>
              </tr>
            ))
          }
        </tbody>
      </StyledTable>
    </div>
  );
}

LocationTable.propTypes = {
  locations: PropTypes.array,
  userId: PropTypes.string,
  setUserLocations: PropTypes.func
};

export default LocationTable;
