const hazard = require("../helpers/hazard");

const getUniformHazardSpectrum = async (location, tr) => {
  const result = [];
  const hazardValues = await hazard(location, tr);

  for (let key in hazardValues) {
    if (hazardValues.hasOwnProperty(key)) {
      result.push({ x: key, y: hazardValues[key] });
    }
  }

  return result;
};

module.exports = getUniformHazardSpectrum;