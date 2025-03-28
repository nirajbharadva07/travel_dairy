import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../../Css/Signup.css";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Signup = ({ setUser }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/signup", data);
      if (res.status === 201) {
        toast.success("Signup successful!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
        });
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch (error) {
      toast.error("Signup failed. Try again!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        theme="dark" 
        transition={Bounce} 
      />
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="signup-input-group">
            <label>Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Full Name is required" })}
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

         {/* Corrected Age field */}
         <div className="signup-input-group">
            <label>Age</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "You must be at least 18 years old" },
                max: { value: 100, message: "Age must be less than 100" }
              })}
            />
            {errors.age && <p className="error-text">{errors.age.message}</p>}
          </div>

          <div className="signup-input-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/, message: "Invalid email format" }
              })}
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>

          <div className="signup-input-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Must be at least 6 characters" }
              })}
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>

          <button type="submit" className="signup-button">Create Account</button>
        </form>

        <p className="signup-link-text">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
