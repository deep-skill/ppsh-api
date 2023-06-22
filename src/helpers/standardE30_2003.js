const { Polygon, PolygonPoints, Location } = require("../db");
const getPolygon = require("./getPolygon");

const standardE30_2003 = async (location, soilType) => {

  const location_data = await Location.findOne({
    where: { id: location },
  });
  const lat = location_data.latitude;
  const long = location_data.longitude;

  const foundPolygons = await Polygon.findAll({
    where: { type: 3 },
  });
  let polygons = [];
  for (const p of foundPolygons) {
    polygons.push(p.points.split("|"));
  };

  const rawCoordinates = await PolygonPoints.findAll({
    where: { type: 3 },
  });
  let coordinates = [];
  for (const c of rawCoordinates) {
    coordinates.push([c.latitude, c.longitude]);
  };

  const mainPolygon = getPolygon(lat, long);
  if (mainPolygon === -1) throw Error("polygon not found");

  let period = [0.0, 0.05, 0.075];
  for (let i = 0.1; i < 1.0; i += 0.05) {
    period.push(i);
  };
  for (let i = 1.0; i < 3.1; i += 0.1) {
    period.push(i);
  };

  const Z_2003 = [0.15, 0.3, 0.4];
  const Z_S_2003 = [1, 1.2, 1.4];
  const Tp_2003 = [0.4, 0.6, 0.9];

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
  };

  const S = Z_S_2003[soilType];
  const g = 1;
  const R = 1;
  const U = 1;

  let spectrumE30_2003 = {};
  period.forEach((T) => {
    let C;
    if (2.5 * Tp_2003[soilType] > T) C = 2.5;
    else C = (2.5 * Tp_2003[soilType]) / T;

    spectrumE30_2003[String(T)] = (Z_2003[zone] * S * C * U * g) / R;
  });

  return spectrumE30_2003;
};

module.exports = standardE30_2003;
