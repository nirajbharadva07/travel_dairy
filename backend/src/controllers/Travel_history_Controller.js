const TravelHistoryModel = require("../models/Travel_history_Model");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage }).single("photos");

const getAllHistory = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const historyRecords = await TravelHistoryModel.find({ userId });
    res.status(200).json({ message: "Data displayed successfully", data: historyRecords });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const createAllHistory = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file) return res.status(400).json({ message: "No image provided" });

    try {
      const newHistory = new TravelHistoryModel({
        ...req.body,
        photos: req.file.path,
      });

      const savedHistory = await newHistory.save();
      res.status(201).json({ message: "Travel history saved successfully", data: savedHistory });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
};

const deleteHistory = async (req, res) => {
  try {
    const deletehistory = await TravelHistoryModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Data deleted successfully", data: deletehistory });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { getAllHistory, createAllHistory, deleteHistory };
