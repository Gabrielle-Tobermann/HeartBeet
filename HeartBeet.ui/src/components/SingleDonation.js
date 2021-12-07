import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import GoogleMap from './GoogleMap';

const render = (status: Status) => <h1>{status}</h1>;

export default function SignleDonation() {
  return (
    <div>
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
          <GoogleMap/>
      </Wrapper>
    </div>
  );
}
