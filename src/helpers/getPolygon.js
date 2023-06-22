const isInsidePolygon = require("./isInsidePolygon");

const getPolygono = (latitude, longitude, polygons, coordinates) => {
  let polygon;

  for (let i = 0; i < polygons.length; i++) {
    polygon = isInsidePolygon(latitude, longitude, i, polygons, coordinates);
    if (polygon) return i;
  }
  return -1;
};

module.exports = getPolygono;
