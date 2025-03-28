import React, { useEffect, useState } from "react";
import "../../Css/Profile.css"; // Import external CSS
import axios from "axios";

export const Profile = ({ user, setActiveRoute }) => {
  const [travelHistory, setTravelHistory] = useState([]);

  // Set active route name on component mount
  useEffect(() => {
    setActiveRoute("Profile");
  }, [setActiveRoute]);

  // Fetch travel history data
  useEffect(() => {
    const fetchTravelHistory = async () => {
      try {
        const response = await axios.get(`/travel-history?userId=${user.id}`);
        setTravelHistory(response.data.data); // Ensure correct data extraction
      } catch (error) {
        console.error("Error fetching travel history:", error);
      }
    };

    fetchTravelHistory();
  }, [user.id]);

  return (
    <div className="profile-container1">
      {/* Profile Header */}
      <div className="profile-header1">
        <div className="profile-info1">
          <h2 className="username1">{user.username}</h2> {/* Name from Signup */}
        </div>
      </div>
      
      {/* Travel History Section */}
      <div className="travel-history1">
        <h3>Travel History</h3>
        <div className="travel-list1">
          {travelHistory.length > 0 ? (
            travelHistory.map((trip) => (
              <div key={trip._id} className="travel-card1">
                <div className="image-container1">
                  <img src={trip.photos ? `http://localhost:3000/${trip.photos}` : "https://via.placeholder.com/150"} alt={trip.destination} />
                </div>
                <div className="travel-details1">
                  <h3>{trip.destination}</h3>
                  <p>📝 {trip.description}</p>
                  <p>🌤️ Weather: {trip.weather}</p>
                  <p>✈️ Transport: {trip.transport}</p>
                  <p>🪧 Attractions: {trip.Attractions}</p>
                  <p>🏨 Stay: {trip.stay}</p>
                  <p>💵 Cost: {trip.cost}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No travel history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
