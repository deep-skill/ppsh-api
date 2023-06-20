const isInsidePolygon = async (lat, long, k, polygons, coordinates) => {
  const nVert = polygons[k].length;
  const testY = lat;
  const testX = long;

  let vertY;
  let vertX;

  for (let t = 0; t < nVert; t++) {
    vertY = coordinates[polygons[k][t] - 1][0];
    vertX = coordinates[polygons[k][t] - 1][1];
  }

  let c = 0;
  const helper = vertY[i] > testY !== vertY[j] > testY && testX < ((vertX[j] - vertX[i]) * (testY - vertY[i])) / (vertY[j] - vertY[i]) + vertX[i];

  for (let i = 0, j = nVert - 1; i < nVert; j = i++) {
    if (helper) c = !c;
  }

  return c;
};

module.exports = isInsidePolygon;
