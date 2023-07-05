const getExceedanceProbability = require("../controllers/getExceedanceProbability");

const getExceedanceProbabilityHandler = async (req, res) => {
  let { lat, long, location, period } = req.query;

  try {
    if (!lat || !long || !location || !period) throw { status: 400, message: "Missed location or period." };
    if(period.slice(period.length-1) == 0) period = parseInt(period * 10) / 10;

    lat = parseInt(lat * 10) / 10;
    long = parseInt(long * 10) / 10;

    const response = await getExceedanceProbability(lat, long, location, period);

    if (!response) throw {status: 404, message: "There is no information in the DB with this location or period."};

    const result = {
      status: "success",
      data: response,
      total: response ? 1 : 0 //response format for current front with jquery
    };

    return res.status(200).json(result);
    
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = getExceedanceProbabilityHandler;
