const { Polygon, Point_polygon, Location } = require("../db");
const getPolygon = require("./getPolygon.js");

const standardE30_2015 = async (location, groundType) => {
  const location_data = await Location.findOne({
    where: { id: location },
  });
  const lat = location_data.latitude;
  const long = location_data.longitude;

  const foundPolygons = await Polygon.findAll({
    where: { type: 2 },
  });
  let polygons = [];
  for (const p of foundPolygons) {
    polygons.push(p.points.split("|"));
  }

  const rawCoordinates = await Point_polygon.findAll({
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

  const Z_2015 = [0.1, 0.25, 0.35, 0.45];
  const Z_S_2015 = [
    [0.8, 1, 1.6, 2],
    [0.8, 1, 1.2, 1.4],
    [0.8, 1, 1.15, 1.2],
    [0.8, 1, 1.05, 1.1],
  ];
  const Tp_2015 = [0.3, 0.4, 0.6, 1];
  const Tl_2015 = [3, 2.5, 2, 1.6];

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

  const S = Z_S_2015[zone][groundType];
  const g = 1;
  const R = 1;
  const U = 1;

  let spectrumE30_2015 = {};
  period.forEach((T) => {
    let C;
    if (T <= Tp_2015[groundType]) C = 2.5;
    if (T > Tp_2015[groundType] && T < Tl_2015[groundType]) C = (2.5 * Tp_2015[groundType]) / T;
    if (T >= Tl_2015[groundType]) C = (2.5 * Tp_2015[groundType] * Tl_2015[groundType]) / (T * T);

    spectrumE30_2015[String(T)] = (Z_2015[zone] * S * C * U * g) / R;
  });

  return spectrumE30_2015;
};

module.exports = standardE30_2015;
