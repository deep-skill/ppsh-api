const { PolygonPoints } = require("../db");

const getDBCoordinates = async (type) => {
  let coordinatesData;
  let coordinates;
  
    coordinatesData = await PolygonPoints.findAll({ where: { type: type } });

    if (!coordinatesData) throw new Error("Coordinates not found");

    for (const coord of coordinatesData) {
      coordinates.push(coord.latitude, coord.longitude);
    }

    return coordinates;
};

module.exports = getDBCoordinates;
