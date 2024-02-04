const express = require("express");
const controller = require("../controllers/history");

const router = express.Router();

router.route("/:day").get(controller.get);

module.exports = router;
