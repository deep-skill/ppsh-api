const getLocations = require("../controllers/getLocations");

const getLocationsHandler = async (req, res) => {
  const { lat, long } = req.query;

  try {
    if (!lat || !long) throw { status: 400, message: "Missed latitude or longitude" };

    const response = await getLocations(lat, long);

    if (!response) throw { status: 404, messsage: "Location not found" };

    const result = {
      status: "success",
      data: response,
      total: response.length, //response format for current front with jquery
    };

    return res.status(200).json(result);

  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = getLocationsHandler;
