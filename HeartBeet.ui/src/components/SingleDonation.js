import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from './GoogleMap';

const render = (status) => <h1>{status}</h1>;

export default function SignleDonation() {
  return (
    <div>
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
        <Map/>
      </Wrapper>
    </div>
  );
}
