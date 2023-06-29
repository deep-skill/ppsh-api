const standardE30_2003 = require("../helpers/standardE30_2003");
const standardE30_2015 = require("../helpers/standardE30_2015");
const standardE30_2015_esp = require("../helpers/standardE30_2015Spec");
const ibc = require("../helpers/ibc");
const asce = require("../helpers/asce");

const getDesignSpectrum = async (location, type, soilType) => {
  let resultData = [];
  let result = [];

  try {

    if (type === "e30_2003" && soilType < 3) {
      resultData = await standardE30_2003(location, soilType);
    } else if (type === "e30_2015" && soilType < 4) {
      resultData = await standardE30_2015(location, soilType);
    } else if (type === "e30_2015_esp" && soilType < 4) {
      resultData = await standardE30_2015_esp(location, soilType);
    } else if (type === "ibc" && soilType < 5) {
      resultData = await ibc(location, soilType);
    } else if (type === "asce" && soilType < 5) {
      resultData = await asce(location, soilType);
    } else {
      throw { status: 400, message: "The provided soilType or standardType is invalid" };
    }

    for (const x in resultData) {
      const y = resultData[x];
      result.push({ x: x, y: y });
    }

    return result;

  } catch (error) {
    throw error;
  }
};

module.exports = getDesignSpectrum;
