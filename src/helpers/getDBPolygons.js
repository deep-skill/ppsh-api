const { Polygon } = require("../db");

const getDBPolygons = async (type) => {
  let polygonsData;
  let polygons = [];

  try {
    polygonsData = await Polygon.findAll({ where: { type: type } });

    if (polygonsData.length < 1) throw {status: 404, message: "There is no information in the DB with this type."};

    for (const polygon of polygonsData) {
      polygons.push(polygon.points.split("|"));
    }

    return polygons;
  } catch (error) {
    throw error;
  }
};

module.exports = getDBPolygons;
