const { Polygon } = require("../db");

const getDBPolygons = async (type) => {
  let polygonsData;
  let polygons = [];

  try {
    polygonsData = await Polygon.findAll({ where: { type: type } });

    if (polygonsData.length < 1) throw new Error("Polygons not found");

    for (const polygon of polygonsData) {
      polygons.push(polygon.points.split("|"));
    }

    return polygons;
  } catch (error) {
    return error;
  }
};

module.exports = getDBPolygons;
