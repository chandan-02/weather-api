const express = require("express");
const router = express.Router();

router.use('/location', require('./location.js'));
router.use('/weather', require('./weather.js'));
router.use('/history', require('./history.js'));

module.exports = router;