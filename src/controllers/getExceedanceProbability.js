const probabilities = require("../helpers/probabilities.js");

const getExceedanceProbability = async (location, period) => {
  const result = await probabilities(location, period);

  return result;
};

module.exports = getExceedanceProbability;
