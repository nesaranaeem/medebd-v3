import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon using an image
const customIcon = L.icon({
  iconUrl: '/marker-icon.png', // Replace with the correct path to your image
  iconSize: [32, 32], // Adjust the size of the icon as needed
  iconAnchor: [16, 32], // Adjust the anchor point as needed
  popupAnchor: [0, -32] // Adjust the popup anchor point as needed
});

const Map = ({ latitude, longitude }) => {
  return (
    <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]} icon={customIcon}>
        <Popup>
          Latitude: {latitude}, Longitude: {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
