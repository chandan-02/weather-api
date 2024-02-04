const express = require("express");
const controller = require("../controllers/weather");

const router = express.Router();

router.route("/:id").get(controller.get);

module.exports = router;
