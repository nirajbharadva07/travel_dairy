import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../../Css/Login.css";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Login = ({ setUser }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/login", data);
      if (res.status === 200) {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
        });
        setTimeout(() => {
          const userData = {
            id: res.data.data._id,
            username: data.email.split("@")[0],
            role: res.data.data.roleID?.name || "Unknown Role",
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
          navigate("/profile");
        }, 2500);
      }
    } catch (error) {
      toast.error("Login failed. Try again!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  }


  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={2000} theme="dark" transition={Bounce} />
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-input-group">
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

          <div className="login-input-group">
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

          <button type="submit" className="login-button1">Login</button>
        </form>

        <p className="login-link-text">
          Don't have an account?{" "}
          <Link to="/signup" className="login-link">Sign Up</Link>
        </p>
        <p className="login-link-text">
          <Link to="/forgotpassword" onClick={handleForgotPassword} className="login-link forgot">Forgot Password</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
