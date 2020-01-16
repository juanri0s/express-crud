const express = require("express");
const rootController = require("../controllers/root.controller");
const router = express.Router();

router
  .route("/test")
  .get(rootController.test);

module.exports = router;