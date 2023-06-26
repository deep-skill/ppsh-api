const getDesignSpectrum = require("../controllers/getDesignSpectrum");

const getDesignSpectrumHandler = async (req, res) => {
  const { location, standardType, soilType } = req.query;
  
  try {
    if (!location || !standardType || !soilType) throw { status: 400, message: "Missing location, standard type, or soil type information" };
    
    const response = await getDesignSpectrum(location, standardType, soilType);
    if (!response) throw { status: 404, message: "There is no information in the DB with this location, standardType or soilType", };
    
    const result = {
      status: "success",
      data: response,
      total: response ? 1 : 0
    };

    return res.status(200).json(result);

  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = getDesignSpectrumHandler;