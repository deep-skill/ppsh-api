const { Polygon, PolygonPoints, Location } = require("../db");
const getPolygon = require("./getPolygon");
const probabilities = require("./probabilities");
const interpolation = require("./interpolation");

const standardE30_2015Spe = async (location, soilType) => {
  const locationData = await Location.findOne({
    where: { id: location },
  });
  const lat = locationData.latitude;
  const long = locationData.longitude;

  const foundPolygons = await Polygon.findAll({
    where: { type: 2 },
  });
  let polygons = [];
  for (const p of foundPolygons) {
    polygons.push(p.points.split("|"));
  }

  const rawCoordinates = await PolygonPoints.findAll({
    where: { type: 2 },
  });
  let coordinates = [];
  for (const c of rawCoordinates) {
    coordinates.push([c.latitude, c.longitude]);
  }

  const mainPolygon = getPolygon(lat, long);
  if (mainPolygon === -1) throw Error("polygon not found");

  let period = [0.0, 0.05, 0.075];
  for (let i = 0.1; i < 1.0; i += 0.05) {
    period.push(i);
  };
  for (let i = 1.0; i < 3.1; i += 0.1) {
    period.push(i);
  };

  
  const Z_S_2015Spec = [
    [0.8, 1, 1.6, 2],
    [0.8, 1, 1.2, 1.4],
    [0.8, 1, 1.15, 1.2],
    [0.8, 1, 1.05, 1.1],
  ];
  const Tp_2015Spec = [0.3, 0.4, 0.6, 1];
  const Tl_2015Spec = [3, 2.5, 2, 1.6];

  let zone;
  switch (mainPolygon) {
    case 0:
      zone = 0;
      break;
    case 1:
      zone = 0;
      break;
    case 2:
      zone = 1;
      break;
    case 3:
      zone = 2;
      break;
    case 4:
      zone = 3;
      break;
    default:
      break;
  };
  
  const prob = probabilities(location, period);
  let PGA = interpolation(prob, (1.0 / 475.0));
  if(PGA < 0.08) PGA = 0.08;

  const S = Z_S_2015Spec[zone][soilType];
  const g = 1;
  const R = 1;
  const U = 1;

  let spectrumE30_2015Spec = {};
  period.forEach((T) => {
    let C;
    if (T <= Tp_2015Spec[soilType]) C = 2.5;
    if (T > Tp_2015Spec[soilType] && T < Tl_2015Spec[soilType]) C = (2.5 * Tp_2015Spec[soilType]) / T;
    if (T >= Tl_2015Spec[soilType]) C = (2.5 * Tp_2015Spec[soilType] * Tl_2015Spec[soilType]) / (T * T);

    spectrumE30_2015Spec[String(T)] = (PGA * S * C * U * g) / R;
  });

  return spectrumE30_2015Spec;
};

module.exports = standardE30_2015Spe;