const getExceedanceProbability = require("../controllers/getExceedanceProbability");

const getExceedanceProbabilityHandler = async (req, res) => {
  const { location, period } = req.query;

  try {
    if (!location || !period) throw { status: 400, error: "Missed location or period." };

    const response = await getExceedanceProbability(location, period);

    if (!response) throw {status: 404, error: "There is no information on this point for the probability graph."};

    const result = {
      status: "success",
      data: response,
      total: response.length, //response format for current front with jquery
    };

    return res.status(200).json(result);
    
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = getExceedanceProbabilityHandler;
