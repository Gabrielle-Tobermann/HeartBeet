import React, { useState, useRef } from 'react';

function Map() {
  const ref = useRef(null);

  const [map, setMap] = useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  return (
    <div ref={ref}
    zoom={10}
    center={{ lat: -34.397, lng: 150.644 }}
    style={{ height: '200px', width: 'auto' }}>
    </div>
  );
}

export default Map;
