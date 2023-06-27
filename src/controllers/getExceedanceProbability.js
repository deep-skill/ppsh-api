const probabilities = require("../helpers/probabilities");

const getExceedanceProbability = async (location, period) => {
  let fixedPeriod;

  if(period === "0.00") {
    fixedPeriod = parseInt(period);
  }else {
    fixedPeriod = period;
  }

  const result = await probabilities(location, fixedPeriod);

  return result;
};

module.exports = getExceedanceProbability;
