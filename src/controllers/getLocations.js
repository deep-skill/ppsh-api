const { Location } = require('../db');

const getLocations = async (lat, long) => {
    // Get lat and long by query. 
    // find in DB a register that match with "latitude" and "longitude received and return it" 
    try {
        const result = await Location.findOne({ where: { latitude: lat, longitude: long}  });

        return result;
    } catch (error) {
        throw new Error(error)
    }
};


module.exports = getLocations;