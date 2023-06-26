const { Polygon } = require("../db");

const getDBPolygons = async (type) => {
  let polygonsData;
  let polygons;
  
    polygonsData = await Polygon.findAll({ where: { type: type } });

    if (!polygonsData) throw new Error("Polygons not found");

    for (const polygon of polygonsData) {
      polygons.push([polygon.points.split("|")]);
    }

    return polygons;
};

module.exports = getDBPolygons;
