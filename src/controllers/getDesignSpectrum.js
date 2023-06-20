const e30_2003 = require("../helpers/e30_2003.js");
const e30_2015 = require("../helpers/e30_2015.js");
const e30_2015_esp = require("../helpers/e30_2015_esp.js");
const ibc = require("../helpers/ibc.js");

const getDesignSpectrum = async (location, type, ground) => {
  const resultData = [];
  const result = [];

  if (type === "e30_2003") resultData = await e30_2003(location, ground);
  if (type === "e30_2015") resultData = await e30_2015(location, ground);
  if (type === "e30_2015_esp")
    resultData = await e30_2015_esp(location, ground);
  if (type === "ibc" || type === "asce")
    resultData = await ibc(location, ground);

  for (const x in resultData) {
    const y = resultData[x];
    result.push({ x: x, y: y });
  }

  return result;
};

module.exports = getDesignSpectrum;
