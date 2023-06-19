// DB conexion
require('dotenv').config();
const { Sequelize } = require('sequelize');
const {
    DB, DB_USERNAME, DB_PASSWORD, DB_HOST
} = process.env;


// Database Instance
const sequelize = new Sequelize(DB, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
});



module.exports = {
    conn: sequelize
}
