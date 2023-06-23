const { Router } = require("express");
const router = Router();
const getDesignSpectrumHandler = require("../handlers/getDesignSpectrumHandler");
const getExceedanceProbabilityHandler = require("../handlers/getExceedanceProbabilityHandler");
const getLocationsHandler = require("../handlers/getLocationsHandler");
const getUniformHazardSpectrumHandler = require("../handlers/getUniformHazardSpectrumHandler");

router.get("/designspectrum", getDesignSpectrumHandler);
router.get("/eprobability", getExceedanceProbabilityHandler);
router.get("/location", getLocationsHandler);
router.get("/hazardspectrum", getUniformHazardSpectrumHandler);

module.exports = router;