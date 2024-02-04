const asyncHandler = require("../utils/asyncHandler");
const { Location } = require("../model");

exports.create = asyncHandler(async (req, res) => {
  try {
    const data = await Location.create(req.body);
    return res.status(201).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
});

exports.update = asyncHandler(async (req, res) => {
  try {
    const data = await Location.update(req.body, {
      where: { id: req.params.id },
    });
    return res.status(201).json({ success: true, data: "Location updated!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
});

exports.delete = asyncHandler(async (req, res) => {
  try {
    const data = await Location.destroy({
      where: { id: req.params.id },
    });
    return res.status(200).json({ success: true, data: "Location deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
});

exports.getAll = asyncHandler(async (req, res) => {
  try {
    const data = await Location.findAll({});
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
});

exports.getSingle = asyncHandler(async (req, res) => {
  try {
    const data = await Location.findOne({
      where: { id: req.params.id },
    });
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
});
