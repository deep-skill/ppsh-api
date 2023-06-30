const getStandards = require("../controllers/getStandards");

const getStandardsHandler = (req, res) => {
  try {
    const response = getStandards();
    if (!response) throw Error("Missing server information");

    const result = {
      status: "success",
      data: response,
      total: response ? 1 : 0,
    };

    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getStandardsHandler;
