const express = require("express");
const exampleController = require("../controllers/example.controller");
const router = express.Router();

router
  .route('/example/:exampleId')
  .get(exampleController.getExampledById);

router
  .route('/example')
  .get(exampleController.getExamples);

router
  .route('/example')
  .post(exampleController.addExample);

router
  .route('/example/:exampleId')
  .delete(exampleController.deleteExample);

router
  .route('/example/:exampleId')
  .put(exampleController.updateExample);

module.exports = router;