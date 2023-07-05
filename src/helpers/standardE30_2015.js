const getPolygon = require("./getPolygon");
const getDBCoordinates = require("./getDBCoordinates");
const getDBPolygons = require("./getDBPolygons");
const getPeriodArray = require("./getPeriodArray");

const standardE30_2015 = async (lat, long, soilType) => {

  try {
    
    const latitude = lat;
    const longitude = long;
    
    const polygons = await getDBPolygons(2);

    const coordinates = await getDBCoordinates(2);

    const mainPolygon = getPolygon(latitude, longitude, polygons, coordinates);
    if (mainPolygon === -1) throw {status: 404, message: "There is no information in the DB with this latitude, longitude, polygons or coordinates"};

    const period = getPeriodArray();

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
    }

    const S = Z_S_2015[zone][soilType];
    const g = 1;
    const R = 1;
    const U = 1;

    let spectrumE30_2015 = {};
    period.forEach((T) => {
      let C;
      if (T <= Tp_2015[soilType]) C = 2.5;
      if (T > Tp_2015[soilType] && T < Tl_2015[soilType])
        C = (2.5 * Tp_2015[soilType]) / T;
      if (T >= Tl_2015[soilType])
        C = (2.5 * Tp_2015[soilType] * Tl_2015[soilType]) / (T * T);

      spectrumE30_2015[T.toString()] = (Z_2015[zone] * S * C * U * g) / R;
    });

    return spectrumE30_2015;

  } catch (error) {
    throw error;
  }
};

module.exports = standardE30_2015;
