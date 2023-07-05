const { W_one, Zer0, Zer1, Zer2, Zer3, Zer4,
  Zer5, Zer6, Zer7 } = require("../db");
const getPolygon = require("./getPolygon");
const getDBCoordinates = require("./getDBCoordinates");
const getDBPolygons = require("./getDBPolygons");


const probabilities = async (lat, long, location, period) => {

  let coordinates = [];
  let polygons = [];
  let zer_data;
  let result = [];
  let X = [];
  // let sum;
  // let Y_y = [];
  // let Y_z = [];
  // let Y_mc = [];
  // let Y_ab = [];
  // let Y_bc = [];
  let Y = [];

  try {
    
    const latitude = lat;
    const longitude = long;

    coordinates = await getDBCoordinates(1);

    polygons = await getDBPolygons(1);

    const polygon = getPolygon(latitude, longitude, polygons, coordinates);

    if (polygon === -1) throw {status: 404, message: "There is no information in the DB with this latitude, longitude, polygons or coordinates"};

    // const ponderationsData = await W_one.findAll();

    // if (ponderationsData.length < 0) throw {status: 404, message: "There is no information in the DB"};

    // let ponderations = [];

    // for (const pond of ponderationsData) {
    //   ponderations.push([pond.Y_y, pond.Y_z, pond.Y_mc, pond.Y_ab, pond.Y_bc]);
    // }

    coordinates = await getDBCoordinates(4);

    polygons = await getDBPolygons(4);

    const polygon2 = getPolygon(
      latitude,
      longitude,
      polygons,
      coordinates
    );

    if (polygon2 === -1) throw {status: 404, message: "There is no information in the DB with this latitude, longitude, polygons or coordinates"};

    switch (polygon2) {
      case 0:
        zer_data = await Zer0.findAll({
          where: { id: location, Periodo: period },
        });
        break;
      case 1:
        zer_data = await Zer1.findAll({
          where: { id: location, Periodo: period },
        });
        break;
      case 2:
        zer_data = await Zer2.findAll({
          where: { id: location, Periodo: period },
        });
        break;
      case 3:
        zer_data = await Zer3.findAll({
          where: { id: location, Periodo: period },
        });
        break;
      case 4:
        zer_data = await Zer4.findAll({
          where: { id: location, Periodo: period },
        });
        break;
      case 5:
        zer_data = await Zer5.findAll({
          where: { id: location, Periodo: period },
        });
        break;
      case 6:
        zer_data = await Zer6.findAll({
          where: { id: location, Periodo: period },
        });
        break;
      case 7:
        zer_data = await Zer7.findAll({
          where: { id: location, Periodo: period },
        });
        break;
      default:
        throw {status: 404, message: "There is no information in the DB with this location or period"};
    }

    if (zer_data.length < 1) throw {status: 404, message: "There is no information in the DB with this location or period"};

    for (const data of zer_data) {
      X.push(data.X);
      // Y_y.push(data.Y_y);
      // Y_z.push(data.Y_z);
      // Y_mc.push(data.Y_mc);
      // Y_ab.push(data.Y_ab);
      // Y_bc.push(data.Y_bc);
      Y.push(data.Y_y);
    }

    for (let i = 0; i < 20; i++) {
      // sum =
      //   Number((ponderations[polygon][0] * Y_y[i]).toFixed(6)) +
      //   Number((ponderations[polygon][1] * Y_z[i]).toFixed(6)) +
      //   Number((ponderations[polygon][2] * Y_mc[i]).toFixed(6)) +
      //   Number((ponderations[polygon][3] * Y_ab[i]).toFixed(6)) +
      //   Number((ponderations[polygon][4] * Y_bc[i]).toFixed(6));
      // // console.log(sum);
      // sum = sum.toFixed(8);
      result.push({ x: +(X[i] / 981), y: Number(Y[i]) });
    }

    return result;

  } catch (error) {
    throw error;
  }
};

module.exports = probabilities;