// src/utils/TravelMap.jsx
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

// Helper to adjust map bounds
const FitBounds = ({ bounds }) => {
  const map = useMap();
  if (bounds && bounds.length > 0) {
    map.fitBounds(bounds, { padding: [50, 50] });
  }
  return null;
};

const TravelMap = ({ travelEntries, isVisible }) => {
  const mapRef = useRef(null);

  // When map overlay becomes visible, invalidate size so map renders properly.
  useEffect(() => {
    if (mapRef.current && isVisible) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 300);
    }
  }, [isVisible]);

  // Collect all coordinates for fitting bounds
  let bounds = [];
  travelEntries.forEach((trip) => {
    if (trip.location && trip.location.coordinates) {
      const [lng, lat] = trip.location.coordinates;
      bounds.push([lat, lng]); // Leaflet expects [lat, lng]
    }
  });

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ width: "100%", height: "100%", borderRadius: "8px" }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {travelEntries.map((trip) => {
        if (trip.location && trip.location.coordinates) {
          const [lng, lat] = trip.location.coordinates;
          const position = [lat, lng];
          return (
            <Marker key={trip._id} position={position}>
              <Popup>
                <h3>{trip.destination}</h3>
                <p>{trip.location.name}</p>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
      {bounds.length > 0 && <FitBounds bounds={bounds} />}
    </MapContainer>
  );
};

export default TravelMap;
