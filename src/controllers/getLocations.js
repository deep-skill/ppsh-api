const { Location } = require("../db");

const getLocations = async (lat, long) => {

  const result = await Location.findOne({ where: { latitude: lat, longitude: long }});

  return result;
};

module.exports = getLocations;
