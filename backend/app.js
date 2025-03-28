const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Load environment variables

const app = express();

// Define allowed origins (both local and production)
// You can add more origins as needed.
const allowedOrigins = [
  process.env.FRONTEND_URL,  // For example: "https://travel-dairy-mern-stack-project-by-niraj.onrender.com"
  "http://localhost:5173"    // Local development
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const roleRoutes = require("./src/routes/Role_Routes.js");
const userRoutes = require("./src/routes/User_Routes.js");
const travelHistoryRoutes = require("./src/routes/Travel_history_Routes.js");

app.use(roleRoutes);
app.use(userRoutes);
app.use(travelHistoryRoutes);


// Connect to MongoDB using the connection string from .env (MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds for slower connections
})
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection error:", err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
