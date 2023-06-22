const interpolation = require("./interpolation");
const probabilities = require("./probabilities");

const hazard = (location, tr) => {
  let period = [0.0, 0.05, 0.075];
  let hazard = {};

  for (let i = 0.1; i < 1.0; i += 0.05) {
    period.push(i);
  }

  for (let i = 1.0; i < 3.1; i += 0.1) {
    period.push(i);
  }

  for (let i = 0; i < period.length; i++) {
    let probability = probabilities(location, period[i]);
    hazard[period[i].toString()] = interpolation(probability, 1 / tr);
  }

  return hazard;
};

module.exports = hazard;
