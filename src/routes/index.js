const { Router } = require("express");
const router = Router();
const {
  getDesignSpectrumHandler,
  getExceedanceProbabilityHandler,
  getLocationsHandler,
  getUniformHazardSpectrumHandler,
  getStandardsHandler
} = require("../handlers");

router.get("/designspectrum", getDesignSpectrumHandler);
router.get("/eprobability", getExceedanceProbabilityHandler);
router.get("/location", getLocationsHandler);
router.get("/hazardspectrum", getUniformHazardSpectrumHandler);
router.get("/standards", getStandardsHandler);

module.exports = router;