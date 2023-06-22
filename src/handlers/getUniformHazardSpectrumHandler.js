const getUniformHazardSpectrum = require("../controllers/getUniformHazardSpectrum");

const getUniformHazardSpectrumHandler = async (req, res) => {
  const { location, tr } = req.query;

  try {
    if (!location || !tr) throw { status: 400, error: "Missed location or tr" };

    const response = await getUniformHazardSpectrum(location, tr);

    if (!response) throw {status: 404, error: "There is no information on this point for the hazard chart"};

    const result = {
      status: "succes",
      data: response,
      total: response.length,
    }; //response format for current front with jquery

    return res.status(200).json(result);
    
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = getUniformHazardSpectrumHandler;
