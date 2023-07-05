const getLocations = require("../controllers/getLocations");

const getLocationsHandler = async (req, res) => {
  let { lat, long } = req.query;

  try {
    if (!lat || !long) throw { status: 400, message: "Missed latitude or longitude" };
    lat = parseInt(lat)
    long = parseInt(long)
    
    const response = await getLocations(lat, long);

    if (!response) throw { status: 404, message: "There is no information in the DB with this latitude or longitude" };

    const result = {
      status: "success",
      data: response.id,
      total: response ? 1 : 0 //response format for current front with jquery
    };

    return res.status(200).json(result);

  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = getLocationsHandler;
