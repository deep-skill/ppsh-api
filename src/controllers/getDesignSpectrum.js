const standardE30_2003 = require("../helpers/standardE30_2003");
const standardE30_2015 = require("../helpers/standardE30_2015");
const standardE30_2015_esp = require("../helpers/standardE30_2015Spec");
const ibc = require("../helpers/ibc");

const getDesignSpectrum = async (location, type, soilType) => {
  let resultData = [];
  let result = [];

  if (type === "e30_2003") resultData = await standardE30_2003(location, soilType);
  if (type === "e30_2015") resultData = await standardE30_2015(location, soilType);
  if (type === "e30_2015_esp") resultData = await standardE30_2015_esp(location, soilType);
  if (type === "ibc" || type === "asce") resultData = await ibc(location, soilType);

  for (const x in resultData) {
    const y = resultData[x];
    result.push({ x: x, y: y });
  }

  return result;
};

module.exports = getDesignSpectrum;
