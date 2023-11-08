import "./App.scss";
import AddressForm from "./components/AddressForm";
import Map from "./components/Map";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

function App() {
  const [address, setAddress] = useState({
    streetAndNumber: "",
    place: "",
    region: "",
    postcode: "",
    country: "",
    latitude: "",
    longitude: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (address.streetAndNumber) {
      console.log("Selected address:", address);
    }
  };

  const updateCoordinates = (latitude, longitude) => {
    setAddress({ ...address, latitude, longitude });
  };

  return (
    <div className="App">
      <AddressForm
        onSubmit={handleFormSubmit}
        address={address}
        setAddress={setAddress}
      />
      {address.longitude && address.latitude && (
        <Map
          longitude={address.longitude}
          latitude={address.latitude}
          updateCoordinates={updateCoordinates}
        />
      )}
    </div>
  );
}

export default App;
