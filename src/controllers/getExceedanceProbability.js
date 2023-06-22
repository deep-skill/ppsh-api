const probabilities = require("../helpers/probabilities");

const getExceedanceProbability = async (location, period) => {
  const result = await probabilities(location, period);

  return result;
};

module.exports = getExceedanceProbability;
