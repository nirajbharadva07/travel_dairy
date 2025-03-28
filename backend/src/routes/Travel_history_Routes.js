const express = require("express");
const router = express.Router();
const TravelHistoryController = require("../controllers/Travel_history_Controller");

router.get("/travel-history", TravelHistoryController.getAllHistory);
router.post("/travel-history", TravelHistoryController.createAllHistory);
router.delete("/travel-history/:id", TravelHistoryController.deleteHistory);

module.exports = router;
