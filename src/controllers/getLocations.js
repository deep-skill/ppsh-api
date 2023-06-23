const { Location } = require("../db");

const getLocations = async (lat, long) => {

  const result = await Location.findOne({ where: { latitude: lat, longitude: long }});
  
  if (!result) throw new Error("Location not found");

  return result;
};

module.exports = getLocations;
