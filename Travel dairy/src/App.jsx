import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "./component/layout/Sidebar";
import { More } from "./component/child/More";
import { Profile } from "./component/child/Profile";
import {Travelhistory} from "./component/child/Travelhistory"; // Change named import to default import
import Login from "./component/layout/Login";
import Signup from "./component/layout/Signup";
import axios from "axios";
import { PrivateRoutes } from "./privateRoutes/PrivateRoutes";
import WelcomePage from "./component/layout/WelcomePage"; // Import WelcomePage component
import "./App.css";
import About from "./component/child/About";
import Contact from "./component/child/Contact";
import Features from "./component/child/Features";
import PublicLayout from "./component/layout/PublicLayout";
import ScrollToTop from "./utils/ScrollToTop";
import ForgotPassword from "./component/layout/Forgotpassword"; // Changed from { Forgotpassword }
import ResetPassword from "./component/layout/Resetpassword";
import { Dashboard } from "./component/admin_panel/Dashboard";
import 'leaflet/dist/leaflet.css';


// Layout Component: Sidebar remains fixed, child components load dynamically
const Layout = ({ user, setUser }) => {
  return (
    <div className="main">
      {user ? (
        <>
          <Sidebar />
          <div className="page-content">
            <Outlet /> {/* Dynamically load child components */}
          </div>
        </>
      ) : (
        <Navigate to="/welcome" /> // Redirect to WelcomePage if user is not logged in
      )}
    </div>
  );
};

export const App = () => {
  // Update axios configuration
  axios.defaults.baseURL = "http://localhost:3000"; // Updated baseURL
  axios.defaults.timeout = 10000; // Increased timeout to 10 seconds
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  // Add axios interceptor for error handling
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.code === 'ERR_CONNECTION_REFUSED') {
        console.error('Server connection failed');
      }
      return Promise.reject(error);
    }
  );

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [activeRoute, setActiveRoute] = useState("Dashboard"); // Default to "Dashboard"

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false); // Set loading to false after checking localStorage
  }, []);

  // Persist user state across reloads
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          element={
            <PublicLayout>
              <Outlet />
            </PublicLayout>
          }
        >
          <Route path="/" element={user ? <Navigate to="/travelhistory" /> : <Navigate to="/welcome" />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} /> {/* Updated component name */}
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
        </Route>

        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route
            index
            element={
              <PrivateRoutes user={user}>
                <Travelhistory setActiveRoute={setActiveRoute} />
              </PrivateRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoutes user={user}>
                <Profile user={user} setActiveRoute={setActiveRoute} />
              </PrivateRoutes>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoutes user={user}>
                <Dashboard setActiveRoute={setActiveRoute} />
              </PrivateRoutes>
            }
          />
          <Route
            path="more"
            element={
              <PrivateRoutes user={user}>
                <More setActiveRoute={setActiveRoute} />
              </PrivateRoutes>
            }
          />
          <Route
            path="travelhistory"
            element={
              <PrivateRoutes user={user}>
                <Travelhistory setActiveRoute={setActiveRoute} />
              </PrivateRoutes>
            }
          />
        </Route>
      </Routes>
    </>
  );
};
