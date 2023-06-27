const getPeriodArray = () => {
  let period = [0.0, 0.05, 0.075];

  for (let i = 0.1; i < 1.0; i += 0.05) {
    period.push(Number(i.toFixed(2)));
  }
  for (let i = 1.0; i < 3.1; i += 0.1) {
    period.push(Number(i.toFixed(2)));
  }
  
  return period;
};

module.exports = getPeriodArray;
