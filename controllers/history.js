const asyncHandler = require("../utils/asyncHandler");
const axios = require("axios");
const { Location } = require("../model");

function extractNumbers(input) {
  const regex = /\d+/g;
  return input.match(regex).map(Number);
}

function subtractDaysFromDate(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

function dateToUnixTimestamp(date) {
  return Math.floor(date.getTime() / 1000);
}

exports.get = asyncHandler(async (req, res) => {
  const { day } = req.params;
  const { locationid } = req.query;
  try {
    const location = await Location.findOne({
      where: { id: locationid },
    });
    if (!location) {
      return res
        .status(400)
        .json({ success: false, data: "Invalid location." });
    }
    let startDate = new Date();
    let endDate = subtractDaysFromDate(startDate, Number(extractNumbers(day)));
    startDate = dateToUnixTimestamp(startDate);
    endDate = dateToUnixTimestamp(endDate);
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.latitude},${location.longitude}/${endDate}/${startDate}?key=${process.env.HISTORY_WEATHER_API}`
    );
    return res.status(200).json({ success: true, data: response?.data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error?.message, data: error });
  }
});
