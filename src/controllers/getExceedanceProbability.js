const probabilities = require("../helpers/probabilities");

const getExceedanceProbability = async (lat, long, location, period) => {
  const result = await probabilities(lat, long, location, period);

  return result;
};

module.exports = getExceedanceProbability;
