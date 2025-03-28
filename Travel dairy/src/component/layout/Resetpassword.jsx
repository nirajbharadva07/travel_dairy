import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../Css/resetpassword.css";
import "react-toastify/dist/ReactToastify.css";

export const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const newPassword = watch("newPassword", "");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/signup/resetpassword", {
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      });
      setMessage(response.data.message);
      if (response.data.success) {
        toast.success("Password reset successful!");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message ||
        (error.code === 'ERR_CONNECTION_REFUSED' ?
          "Cannot connect to server. Please try again later." :
          "An error occurred");
      setMessage(errorMessage);
      toast.error(errorMessage);
      console.error("Error details:", error.response?.data || error.message);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2 className="reset-title">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: { value: 6, message: "Must be at least 6 characters" }
              })}
              placeholder="Enter new password"
            />
            {errors.newPassword && <p className="error-text">{errors.newPassword.message}</p>}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: value => value === newPassword || "Passwords do not match"
              })}
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className="reset-button">Reset Password</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="back-login">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
