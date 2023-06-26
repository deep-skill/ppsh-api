const { PolygonPoints } = require("../db");

const getDBCoordinates = async (type) => {
  let coordinatesData;
  let coordinates = [];

  try {
    coordinatesData = await PolygonPoints.findAll({ where: { type: type } });

    if (coordinatesData.length < 1) throw {status: 404, message: "There is no information in the DB with this type"};

    for (const coord of coordinatesData) {
      coordinates.push([coord.latitude, coord.longitude]);
    }

    return coordinates;

  } catch (error) {
    throw error;
  }
};

module.exports = getDBCoordinates;
