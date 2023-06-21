const { PolygonPoints } = require("../models/PolygonPoints");

const getDBCoordinates = async (type) => {
  let coordinates_data;
  let coordinates;
  try {
    coordinates_data = await PolygonPoints.findAll({ where: { type: type } });

    if (!coordinates_data) throw new Error("coordinates not found");

    for (const coord of coordinates_data) {
      coordinates.push(coord.latitude, coord.longitude);
    }

    return coordinates;
    
  } catch (error) {
    return error;
  }
};

module.exports = {
  getDBCoordinates,
};
