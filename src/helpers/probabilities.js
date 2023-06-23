const { Polygon, PolygonPoints, Location, W_one, Zer0, Zer1, Zer2, Zer3, Zer4,
    Zer5, Zer6, Zer7} = require("../db");
const getPolygon = require("./getPolygon")    ;


const probabilities = async (location, period)=>{
    let coordinatesData;
    let coordinates = [];
    let polygonsData;
    let polygons = [];
    let zer_data;
    let sum;
    let result = [];
	let X = [];
	let Y_y = [];
	let Y_z = [];
	let Y_mc = [];
	let Y_ab = [];
	let Y_bc = [];

    try {

      const locationData = await Location.findByPk(location);

      if (!locationData) throw new Error("location not found");

      const latitude = locationData.latitude;
      const longitude = locationData.longitude;

      coordinatesData = await PolygonPoints.findAll({ where: { type: 1 } });

      if (!coordinatesData) throw new Error("coordinates not found");

      for (const coord of coordinatesData) {
        coordinates.push(coord.latitude, coord.longitude);
      }

      polygonsData = await Polygon.findAll({ where: { type: 1 } });

      if (!polygonsData) throw new Error("polygons not found");

      for (const pol of polygonsData) {
        polygons.push(pol.point.split("|"));
      }

      const polygon = getPolygon(latitude, longitude, polygons, coordinates);

      if (polygon === -1) throw new Error("polygon not found");

      const ponderationsData = W_one.findAll();
      
      let ponderations = [];

      for (const pond of ponderationsData) {
        ponderations.push(pond.Y_y, pond.Y_z, pond.Y_mc, pond.Y_ab, pond.Y_bc);
      }

      coordinatesData = await PolygonPoints.findAll({ where: { type: 4 } });
      
      if (!coordinatesData) throw new Error("coordinates not found");

      coordinates = [];
      for (const coord of coordinatesData) {
        coordinates.push(coord.latitude, coord.longitude);
      }

      polygonsData = await Polygon.findAll({ where: { type: 4 } });

      if (!polygonsData) throw new Error("polygons not found");

      polygons = [];
      for (const pol of polygonsData) {
        polygons.push(pol.point.split("|"));
      }

      const polygon2 = await getPolygon(
        latitude,
        longitude,
        polygons,
        coordinates
      );

      if (polygon2 === -1) throw new Error("polygon not found");

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
          throw new Error("polygon is out of parameters");
      }

      if (!zer_data) throw new Error("information not found");

      
      for (const data of zer_data) {
        X.push(data.X);
        Y_y.push(data.Y_y);
        Y_z.push(data.Y_z);
        Y_mc.push(data.Y_mc);
        Y_ab.push(data.Y_ab);
        Y_bc.push(data.Y_bc);
      }

      
      for (let i = 0; i < 20; i++) {
        sum =
          ponderations[polygon][0] * Y_y[i] +
          ponderations[polygon][1] * Y_z[i] +
          ponderations[polygon][2] * Y_mc[i] +
          ponderations[polygon][3] * Y_ab[i] +
          ponderations[polygon][4] * Y_bc[i];
        sum = sum.toFixed(8);
        result.push({ x: X[i] / 981, y: sum });
      }

      return result;
    } catch (error) {
      return error;
    }
};

module.exports = probabilities;