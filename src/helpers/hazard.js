const interpolation = require("./interpolation");
const probabilities = require("./probabilities");
const getPeriodArray = require("./getPeriodArray");

const hazard = async (lat, long, location, tr) => {
  let period = getPeriodArray()

  let hazard = {};

  for (let i = 0; i < period.length; i++) {
    let probability = await probabilities(lat, long, location, period[i]);
    hazard[period[i].toString()] = interpolation(probability, 1 / tr);
  }

  return hazard;
};

module.exports = hazard;
