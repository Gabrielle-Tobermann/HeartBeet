import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'reactstrap';
import { deleteLocation } from '../../helpers/data/LocationData';

function LocationTable({ locations, userId, setUserLocations }) {
  const handleDelete = (locationId) => {
    deleteLocation(locationId, userId).then(setUserLocations);
  };
  return (
    <div>
        <Table>
        <thead>
          <tr>
            <th>#</th>
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
                <th scope="row">{i + 1}</th>
                <td>{location.street}</td>
                <td>{location.city}</td>
                <td>{location.state}</td>
                <td>{location.zip}</td>
                <td><i className="fas fa-pen"></i></td>
                <td onClick={() => handleDelete(location.id)}><i className="far fa-trash-alt"></i></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

LocationTable.propTypes = {
  locations: PropTypes.array,
  userId: PropTypes.string,
  setUserLocations: PropTypes.func
};

export default LocationTable;
