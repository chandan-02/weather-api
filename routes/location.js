const express = require("express");
const controller = require("../controllers/location");
const validations = require("../validations/location");
const validate = require("../utils/validate");

const router = express.Router();

router.route("/").get(controller.getAll);
router.route("/:id").get(controller.getSingle);
router.route("/").post(validate(validations.create), controller.create);
router.route("/:id").put(validate(validations.update), controller.update);
router.route("/:id").delete(controller.delete);

module.exports = router;
