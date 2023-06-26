const { PolygonPoints } = require("../db");

const getDBCoordinates = async (type) => {
  let coordinatesData;
  let coordinates = [];

  try {
    coordinatesData = await PolygonPoints.findAll({ where: { type: type } });

    if (coordinatesData.length < 1) throw new Error("Coordinates not found");

    for (const coord of coordinatesData) {
      coordinates.push([coord.latitude, coord.longitude]);
    }

    return coordinates;

  } catch (error) {
    return error;
  }
};

module.exports = getDBCoordinates;
