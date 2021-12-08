import React, { useState } from 'react';

function Map() {
  // eslint-disable-next-line no-undef
  const ref = React.useRef<HTMLDivElement>(null);

  // const ref = useRef(null);
  // eslint-disable-next-line no-undef
  const [map, setMap] = useState(google.maps.Map);

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  return (
    <div ref={ref}>
    </div>
  );
}

export default Map;
