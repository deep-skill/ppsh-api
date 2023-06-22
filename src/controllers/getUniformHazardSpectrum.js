const hazard = require("../helpers/hazard");

const getUniformHazardSpectrum = (location, tr) => {
  const result = [];
  const hazardValues = hazard(location, tr);

  for (let key in hazardValues) {
    if (hazardValues.hasOwnProperty(key)) {
      result.push({ x: key, y: hazardValues[key] });
    }
  }

  return result;
};

module.exports = getUniformHazardSpectrum;