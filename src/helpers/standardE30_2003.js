const { Location } = require("../db");
const getPolygon = require("./getPolygon");
const getDBCoordinates = require("./getDBCoordinates");
const getDBPolygons = require("./getDBPolygons");
const getPeriodArray = require("./getPeriodArray");

const standardE30_2003 = async (location, soilType) => {
  try {
    const locationData = await Location.findByPk(location);
    if (!locationData) throw { status: 404, message: "There is no information in the DB with this location ID" };

    const latitude = locationData.latitude;
    const longitude = locationData.longitude;

    const polygons = await getDBPolygons(3);

    const coordinates = await getDBCoordinates(3);

    const mainPolygon = getPolygon(latitude, longitude, polygons, coordinates);
    if (mainPolygon === -1) throw {status: 404, message: "There is no information in the DB with this latitude, longitude, polygons or coordinates"};

    const period = getPeriodArray();

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
    }

    const S = Z_S_2003[soilType];
    const g = 1;
    const R = 1;
    const U = 1;

    let spectrumE30_2003 = {};
    period.forEach((T) => {
      let C;
      if (2.5 * Tp_2003[soilType] > T * 2.5) C = 2.5;
      else C = (2.5 * Tp_2003[soilType]) / T;

      spectrumE30_2003[T.toString()] = (Z_2003[zone] * S * C * U * g) / R;
    });

    return spectrumE30_2003;

  } catch (error) {
    throw error;
  }
};

module.exports = standardE30_2003;
