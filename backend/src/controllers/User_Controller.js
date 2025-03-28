const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Use_Model");
const { sendingMail, welcomeMailContent, resetPasswordMailContent } = require("../utils/MailUtil");
const secret = process.env.JWT_SECRET || "secret"; // Use environment variable for JWT secret

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }).populate("roleID");
    if (!foundUser) {
      return res.status(404).json({ message: "Email not found" });
    }
    const isMatch = bcrypt.compareSync(password, foundUser.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login success", data: foundUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error", data: error });
  }
};

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(4);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const userCreated = await User.create(req.body);

    // Send welcome email using dedicated content
    await sendingMail(userCreated.email, "Welcome to Travel Diary!", welcomeMailContent(userCreated.name));

    res.status(201).json({ message: "User created", data: userCreated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error", data: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roleID");
    res.json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: "Error", data: error });
  }
};

const createAllUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error", data: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error", data: error });
  }
};

const getUserById = async (req, res) => {
  try {
    const userById = await User.findById(req.params.id);
    res.json({ message: "User found successfully", data: userById });
  } catch (error) {
    res.status(500).json({ message: "Error", data: error });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found, register first." });
    }

    // Generate a reset token valid for 1 hour
    const token = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: "1h" });
    const resetLink = `http://localhost:5173/resetpassword/${token}`;

    // Generate reset email content using dedicated template
    const htmlContent = resetPasswordMailContent(user.name, resetLink);

    // Send Reset Password email
    await sendingMail(user.email, "Reset Your Password", htmlContent);

    // Optionally store the time of request to prevent spamming (if needed)
    user.resetRequestedAt = Date.now();
    await user.save();

    res.status(200).json({ message: "Reset password link sent to your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }
    
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Invalid or expired token", error });
  }
};


module.exports = {
  getAllUsers,
  createAllUser,
  deleteUser,
  getUserById,
  signup,
  login,
  forgotPassword,
  resetPassword,
};
