const express = require("express");
const router = express.Router();
const axios = require("axios");

// Get departures for the next 2 months

router.get("/departures", async (req, res) => {
  try {
    req.header("Access-Control-Allow-Origin", "*");
    const today = new Date();
    const twoMonthsLater = new Date(today.setMonth(today.getMonth() + 2));
    const ALGECIRAS = "ALGECEUT";
    const urlALG = `https://tadpole.clickferry.app/departures?route=${ALGECIRAS}&time=`;
    const dates = {};
    for (let d = new Date(); d <= twoMonthsLater; d.setDate(d.getDate() + 1)) {
      const date = d.toISOString().split("T")[0];
      const response1 = await axios.get(urlALG + date);
      if (response1.data.length > 0) {
        dates[date] = true;
      }
    }
    res.status(200).json({
      status: "Success",
      data: dates,
      error: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      data: null,
      error: error,
    });
  }
});

module.exports = router;
