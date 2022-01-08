import PropTypes from 'prop-types';
import React from 'react';
import { deleteLocation } from '../../helpers/data/LocationData';
import { StyledTable, StyledTd, TableWrapper } from '../../styles/ProfileStyle';
import EditLocationModal from './EditLocationModal';

function LocationTable({ locations, userId, setUserLocations }) {
  const handleDelete = (locationId) => {
    deleteLocation(locationId, userId).then(setUserLocations);
  };
  return (
    <TableWrapper>
        <StyledTable style={{ borderColor: 'white' }}>
        <thead style={{ borderColor: 'white' }}>
          <tr style={{ borderColor: 'white' }}>
            <th style={{ borderColor: 'white' }}>Street</th>
            <th style={{ borderColor: 'white' }}>City</th>
            <th style={{ borderColor: 'white' }}>State</th>
            <th style={{ borderColor: 'white' }}>Zip</th>
            <th style={{ borderColor: 'white' }}></th>
          </tr>
        </thead>
        <tbody>
          {
            locations.map((location, i) => (
              location.softDelete
                ? null
                : <tr key={i} style={{ borderColor: 'white' }}>
                <td style={{ borderColor: 'white' }}>{location.street}</td>
                <td style={{ borderColor: 'white' }}>{location.city}</td>
                <td style={{ borderColor: 'white' }}>{location.state}</td>
                <td style={{ borderColor: 'white' }}>{location.zip}</td>
                <StyledTd style={{ borderColor: 'white' }}><EditLocationModal
                      locationId={location.id}
                      setUserLocations={setUserLocations}
                      />
                </StyledTd>
                <StyledTd onClick={() => handleDelete(location.id)}
                style={{ borderColor: 'white' }}
                ><i className="far fa-trash-alt"></i></StyledTd>
              </tr>
            ))
          }
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
}

LocationTable.propTypes = {
  locations: PropTypes.array,
  userId: PropTypes.string,
  setUserLocations: PropTypes.func
};

export default LocationTable;
