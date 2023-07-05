const hazard = require("../helpers/hazard");

const getUniformHazardSpectrum = async (lat, long, location, tr) => {
  const result = [];
  const hazardValues = await hazard(lat, long, location, tr);

  for (let key in hazardValues) {
    if (hazardValues.hasOwnProperty(key)) {
      result.push({ x: key, y: hazardValues[key] });
    }
  }

  return result;
};

module.exports = getUniformHazardSpectrum;