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
    center={{ lat: 36.1627, lng: 86.7816 }}
    zoom={0}
    style={{ height: '400px', width: '800px' }}>
    </div>
  );
}

export default Map;
