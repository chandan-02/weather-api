const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");

router.use('/location', require('./location.js'));
router.use('/weather', require('./weather.js'));
router.use('/history', require('./history.js'));
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;