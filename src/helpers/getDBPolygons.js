const { Polygon } = require("../models/Polygon");

const getDBPolygons = async (type) => {
  let polygonsData;
  let polygons;
  try {
    polygonsData = await Polygon.findAll({ where: { type: type } });

    if (!polygonsData) throw new Error("polygons not found");

    for (const polygon of polygonsData) {
      polygons.push(polygon.point.split("|"));
    }

    return polygons;
    
  } catch (error) {
    return error;
  }
};

module.exports = {
  getDBPolygons,
};
