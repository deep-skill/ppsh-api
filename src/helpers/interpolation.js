const interpolation = (hazard, acceleration) => {
  let _x = 0;
  let _y = 0;

  for (let index in hazard) {
    const x = hazard[index]["x"];
    const y = hazard[index]["y"];

    if (index > 0) {
      if (_y < acceleration && acceleration < y) {
        const m = Math.log(_y / y) / Math.log(_x / x);
        const k = _y / Math.pow(_x, m);
        const probability = Math.exp(Math.log(acceleration / k) / m);
        return probability;
      }
    }

    _x = x;
    _y = y;
  }

  return 0;
};

module.exports = interpolation;