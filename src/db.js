// DB conexion
require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

// Database Instance
const sequelize = new Sequelize(DB, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

const base = path.basename(__filename);
const models = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== base && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    models.push(require(path.join(__dirname, "/models", file)));
  });

models.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let entriesCapitalized = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(entriesCapitalized);

const { Location, Zer0, Zer1, Zer2, Zer3, Zer4, Zer5, Zer6, Zer7 } =
  sequelize.models;

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
