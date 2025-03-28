import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../../Css/forgotpassword.css";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Prevent multiple clicks

  const onSubmit = async (data) => {
    if (isLoading) return; // Prevent duplicate requests
    setIsLoading(true);

    try {
      const response = await axios.post("/signup/forgotpassword", { email: data.email });
      toast.success(response?.data?.message || "Reset link sent to your email!");

      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds

    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <div className="forgot-box">
        <h2 className="forgot-title">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              {...register("email", { required: "Email is required" })} 
              placeholder="Enter your email" 
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>
          <button type="submit" className="forgot-button" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="back-login">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
