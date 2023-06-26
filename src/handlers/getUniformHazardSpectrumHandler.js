const getUniformHazardSpectrum = require("../controllers/getUniformHazardSpectrum");

const getUniformHazardSpectrumHandler = async (req, res) => {
  const { location, tr } = req.query;

  try {
    if (!location || !tr) throw { status: 400, message: "Missed location or tr" };

    const response = await getUniformHazardSpectrum(location, tr);

    if (!response) throw {status: 404, message: "There is no information in the DB with this location or 'tr'"};

    const result = {
      status: "succes",
      data: response,
      total: response ? 1 : 0
    }; //response format for current front with jquery

    return res.status(200).json(result);
    
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = getUniformHazardSpectrumHandler;
