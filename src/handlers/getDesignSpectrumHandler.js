const getDesignSpectrum = require("../controllers/getDesignSpectrum");

const getDesignSpectrumHandler = async (req, res) => {
  let { lat, long , location, standardType, soilType } = req.query;
  
  try {
    if (!lat || !long || !location || !standardType || !soilType) throw { status: 400, message: "Missing location, standard type, or soil type information" };
    
    lat = parseInt(lat * 10) / 10;
    long = parseInt(long * 10) / 10;

    const response = await getDesignSpectrum(lat, long, location, standardType, soilType);
    if (!response) throw { status: 404, message: "There is no information in the DB with this location, standardType or soilType" };
    
    const result = {
      status: "success",
      data: response.sort((a,b) => +a.x - +b.x),
      total: response.length
    };

    return res.status(200).json(result);

  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = getDesignSpectrumHandler;