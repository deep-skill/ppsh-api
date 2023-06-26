const getExceedanceProbability = require("../controllers/getExceedanceProbability");

const getExceedanceProbabilityHandler = async (req, res) => {
  const { location, period } = req.query;

  try {
    if (!location || !period) throw { status: 400, message: "Missed location or period." };

    const response = await getExceedanceProbability(location, period);

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
