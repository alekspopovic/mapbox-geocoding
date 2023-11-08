import "../styles/Map.scss";
import PropTypes from "prop-types";
import PointerIcon from "../assets/pointer.svg";
import ReactMapGl, { Marker } from "react-map-gl";
import { useState, useEffect } from "react";

const TOKEN = import.meta.env.VITE_TOKEN;

Map.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  updateCoordinates: PropTypes.func.isRequired,
};

function Map({ longitude, latitude, updateCoordinates }) {
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 16,
  });

  const [marker, setMarker] = useState({
    latitude,
    longitude,
  });

  useEffect(() => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      latitude,
      longitude,
    }));
  }, [latitude, longitude]);

  const handleMarkerDrag = (event) => {
    const latitude = event.lngLat.lat;
    const longitude = event.lngLat.lng;

    setMarker({ latitude, longitude });

    updateCoordinates(latitude, longitude);
  };

  return (
    <div className="map">
      <ReactMapGl
        {...viewport}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMove={(event) => {
          setViewport(event.viewState);
        }}
      >
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        >
          <img className="marker" src={PointerIcon} />
        </Marker>
      </ReactMapGl>
    </div>
  );
}

export default Map;
