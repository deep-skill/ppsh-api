const isInsidePolygon = (lat, long, k, polygons, coordinates) => {

  const nVert = polygons[k].length;
  const testY = +lat;
  const testX = +long;

  const numberCoordinates = coordinates.map(array => array.map(coordinate => +coordinate))
  
  let vertY = [];
  let vertX = [];

  for (let t = 0; t < nVert; t++) {
    vertY.push(numberCoordinates[polygons[k][t] - 1][0]);
    vertX.push(numberCoordinates[polygons[k][t] - 1][1]);
  }

  let response = 0;

  for (let i = 0, j = nVert - 1; i < nVert; j = i++) {
    if (((vertY[i] > testY) !== (vertY[j] > testY)) &&
      (testX < (vertX[j] - vertX[i]) * (testY - vertY[i]) / (vertY[j] - vertY[i]) + vertX[i])) {
      response = !response;
    }
  }

  return response;
};

module.exports = isInsidePolygon;
