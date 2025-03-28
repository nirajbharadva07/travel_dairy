// models/travelHistoryModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: { type: String, default: "" },
  coordinates: {
    type: [Number], // [lng, lat]
    required: true
  }
});

const travelHistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  description: { type: String, required: true },
  photos: { type: String, required: true },
  weather: { type: String, required: true },
  transport: { type: String, required: true },
  attractions: { type: String, required: true },
  stay: { type: String, required: true },
  cost: { type: Number, required: true },

  // Single location per entry
  location: {
    type: locationSchema,
    required: true
  }
});

module.exports = mongoose.model("travelHistories", travelHistorySchema);
