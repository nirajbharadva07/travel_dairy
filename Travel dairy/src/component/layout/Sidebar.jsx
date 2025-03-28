import React from "react";
import "../../Css/Sidebar.css";
import { Database, History, ListCollapse, LogOutIcon, UserPen } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const allowedId = "67e3e5a0b8f2664a0b1de15c"; // Allowed User ID
  const storedUser = localStorage.getItem("user"); // Get the stored user data
  const navigate = useNavigate();

  // Parse the stored user data (Handle case when it's null)
  const userData = storedUser ? JSON.parse(storedUser) : null;
  const storedId = userData?.id; // Extract the ID

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      navigate("/welcome");
    }
  };

  return (
    <div className="sidebar">
      <h1 className="title1">
        <span className="title1-text">TRAVEL DIARY</span>
        <span className="author-text">By Niraj</span>
      </h1>
      <ul>
        <NavLink to="/travelhistory" className={({ isActive }) => (isActive ? "active" : "")}>
          <li>
            <History /> Travel history
          </li>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
          <li>
            <UserPen /> Profile
          </li>
        </NavLink>

        {/* Show Dashboard link only if user ID matches */}
        {storedId === allowedId && (
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            <li>
              <Database /> Dashboard
            </li>
          </NavLink>
        )}

        <NavLink to="/more" className={({ isActive }) => (isActive ? "active footer" : "footer")}>
          <li>
            <ListCollapse /> More
          </li>
        </NavLink>
        <li 
          onClick={handleLogout} 
          className="logout-btn"
          style={{ marginTop: storedId === allowedId ? "17rem" : "22rem" }} // Conditional margin
        >
          <LogOutIcon /> Logout
        </li>
      </ul>
    </div>
  );
};
