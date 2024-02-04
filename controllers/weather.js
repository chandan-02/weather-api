const asyncHandler = require("../utils/asyncHandler");
const axios = require("axios");
const { Location } = require("../model");

exports.get = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findOne({
      where: { id: id },
    });
    if (!location) {
      return res
        .status(400)
        .json({ success: false, data: "Invalid location." });
    }
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.WEATHER_API}`
    );
    return res.status(200).json({ success: true, data: response?.data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: error?.message,
        data: error?.response?.data,
      });
  }
});
