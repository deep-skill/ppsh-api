const interpolation = require("./interpolation");
const probabilities = require("./probabilities");

const fvAsce = (Sl, tp) => {
  const F = [
    [0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
    [0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
    [1.5, 1.5, 1.5, 1.5, 1.5, 1.4],
    [2.4, 2.2, 2.0, 1.9, 1.8, 1.7],
    [4.2, 4.0, 4.0, 4.0, 4.0, 4.0],
  ];

  if (Sl <= 0.1) return F[tp][0];
  if (Sl <= 0.2) return ((F[tp][0] - F[tp][1]) / 0.1) * (0.2 - Sl) + F[tp][1];
  if (Sl <= 0.3) return ((F[tp][1] - F[tp][2]) / 0.1) * (0.3 - Sl) + F[tp][2];
  if (Sl <= 0.4) return ((F[tp][2] - F[tp][3]) / 0.1) * (0.4 - Sl) + F[tp][3];
  if (Sl <= 0.5) return ((F[tp][3] - F[tp][4]) / 0.1) * (0.5 - Sl) + F[tp][4];
  if (Sl <= 0.6) return ((F[tp][4] - F[tp][5]) / 0.1) * (0.6 - Sl) + F[tp][5];

  return F[tp][5];
};

const faAsce = (Ss, tp) => {
  const F = [
    [0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
    [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
    [1.3, 1.3, 1.2, 1.2, 1.2, 1.2],
    [1.6, 1.4, 1.2, 1.1, 1.0, 1.0],
    [2.4, 1.7, 1.3, 1.0, 1.0, 1.0],
  ];

  if (Ss <= 0.25) return F[tp][0];
  if (Ss <= 0.50) return ((F[tp][0] - F[tp][1]) / 0.25) * (0.50 - Ss) + F[tp][1];
  if (Ss <= 0.75) return ((F[tp][1] - F[tp][2]) / 0.25) * (0.75 - Ss) + F[tp][2];
  if (Ss <= 1.00) return ((F[tp][2] - F[tp][3]) / 0.25) * (1.00 - Ss) + F[tp][3];
  if (Ss <= 1.25) return ((F[tp][3] - F[tp][4]) / 0.25) * (1.25 - Ss) + F[tp][4];
  if (Ss <= 1.50) return ((F[tp][3] - F[tp][4]) / 0.25) * (1.50 - Ss) + F[tp][5];

  return F[tp][5];
};

const asce = async (location, soilType) => {

  let prob = await probabilities(location, 0.2);
  let Ss = interpolation(prob, 1.0 / 2475.0); //PGA1

  let prob2 = await probabilities(location, 1.0);
  let Sl = interpolation(prob2, 1.0 / 2500.0); //PGA2
  if (Sl < 0.08) Sl = 0.08;

  let Fv = fvAsce(Sl, soilType);
  let Fa = faAsce(Ss, soilType);

  let Sml = Fv * Sl;
  let Sms = Fa * Ss;

  let Sdl = (2.0 / 3.0) * Sml;
  let Sds = (2.0 / 3.0) * Sms;

  let T0 = (Sdl / Sds) * 0.2;
  let Ts = Sdl / Sds;

  let asceSpectrum = {};

  for (let T = 0.0; T < 3.01; T += 0.01) {
    if (T < T0) {
      asceSpectrum[T.toString()] = Sds * (0.4 + (0.6 * T) / T0);
    } else if (T >= Ts) {
      asceSpectrum[T.toString()] = Sdl / T;
    } else {
      asceSpectrum[T.toString()] = Sds;
    }
  }

  return asceSpectrum;
};

module.exports = asce;