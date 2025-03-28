// src/pages/TravelHistoryPage.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import TravelMap from "../utils/TravelMap";
import "../../Css/Travelhistory.css";

export const Travelhistory = () => {
  const { register, handleSubmit, reset } = useForm();
  const [travelData, setTravelData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false); // Controls map overlay
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch travel history for logged-in user
  useEffect(() => {
    const fetchTravelHistory = async () => {
      try {
        const response = await axios.get(`/travel-history?userId=${user.id}`);
        setTravelData(response.data.data);
      } catch (error) {
        console.error("Error fetching travel history:", error);
      }
    };
    fetchTravelHistory();
  }, [user.id]);

  // Toggle body scroll when a modal or map overlay is open
  useEffect(() => {
    if (selectedImage || isFormOpen || isMapOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [selectedImage, isFormOpen, isMapOpen]);

  // Handle new travel entry submission
  const handleAddHistory = async (data) => {
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("destination", data.destination);
    formData.append("startDate", data.startDate);
    formData.append("description", data.description);
    formData.append("weather", data.weather);
    formData.append("transport", data.transport);
    formData.append("attractions", data.attractions);
    formData.append("stay", data.stay);
    formData.append("cost", data.cost);
    formData.append("photos", data.photos[0]);
    formData.append("location[name]", data.locationName);

    // Parse coordinates from string "lng,lat"
    const [lng, lat] = data.coordinates.split(",").map(Number);
    formData.append("location[coordinates][]", lng);
    formData.append("location[coordinates][]", lat);

    try {
      const response = await axios.post("/travel-history", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTravelData([...travelData, response.data.data]);
      setIsFormOpen(false);
      reset();
    } catch (error) {
      console.error("Error adding travel history:", error);
    }
  };

  const handleDelete = async (tripId) => {
    try {
      await axios.delete(`/travel-history/${tripId}`);
      setTravelData(travelData.filter((trip) => trip._id !== tripId));
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <div className="travel-container">
      {/* Header */}
      <div className="header-container">
        <h2 className="travel-heading">My Travel History</h2>
        <button className="add-history-btn" onClick={() => setIsFormOpen(true)}>
          🧳 Add Trip
        </button>
      </div>

      {/* Travel List */}
      <div className="content-to-blur">
        <div className="travel-list-wrapper">
          <div className="travel-list">
            {travelData.map((trip) => (
              <div key={trip._id} className="travel-card">
                <div
                  className="image-container"
                  onClick={() =>
                    setSelectedImage(`https://travel-dairy.onrender.com/${trip.photos}`)
                  }
                >
                  <img
                    src={`https://travel-dairy.onrender.com/${trip.photos}`}
                    alt={trip.destination}
                  />
                </div>
                <div className="travel-details">
                  <h3>{trip.destination}</h3>
                  <p>📝 {trip.description}</p>
                  <p>🌤️ Weather: {trip.weather}</p>
                  <p>✈️ Transport: {trip.transport}</p>
                  <p>🪧 Attractions: {trip.attractions}</p>
                  <p>🏨 Stay: {trip.stay}</p>
                  <p>💵 Cost: {trip.cost}</p>
                  {trip.location && (
                    <p>
                      📍 {trip.location.name} (
                      {trip.location.coordinates.join(", ")})
                    </p>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(trip._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Button for Map Overlay */}
      <button
        className={`floating-btn ${isMapOpen ? "active" : ""}`}
        onClick={() => setIsMapOpen(!isMapOpen)}
      >
        {isMapOpen ? "Close Map" : "Open Map"}
      </button>

      {/* Map Overlay */}
      <div className={`map-overlay ${isMapOpen ? "show" : ""}`}>
        <div className="map-inner">
          <TravelMap travelEntries={travelData} isVisible={isMapOpen} />
        </div>
      </div>

      {/* Modal for Adding a New Trip */}
      {isFormOpen && (
        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="form-modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit(handleAddHistory)}>
              <div className="form-group">
                <label htmlFor="destination">Destination</label>
                <input
                  type="text"
                  id="destination"
                  {...register("destination")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  {...register("startDate")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  {...register("description")}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="photos">Photos</label>
                <input
                  type="file"
                  id="photos"
                  {...register("photos")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="weather">Weather</label>
                <input
                  type="text"
                  id="weather"
                  {...register("weather")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="transport">Transport</label>
                <input
                  type="text"
                  id="transport"
                  {...register("transport")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="attractions">Attractions</label>
                <input
                  type="text"
                  id="attractions"
                  {...register("attractions")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="stay">Stay</label>
                <input
                  type="text"
                  id="stay"
                  {...register("stay")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cost">Cost</label>
                <input
                  type="number"
                  id="cost"
                  {...register("cost")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="locationName">Location Name</label>
                <input
                  type="text"
                  id="locationName"
                  {...register("locationName")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="coordinates">Coordinates (lng,lat)</label>
                <input
                  type="text"
                  id="coordinates"
                  placeholder="e.g., -74.0060,40.7128"
                  {...register("coordinates")}
                  required
                />
              </div>
              <div className="form-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <img
            src={selectedImage}
            alt="Full size"
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="close-btn" onClick={() => setSelectedImage(null)}>
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default Travelhistory;
