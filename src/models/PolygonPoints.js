const { DataTypes } = require('sequelize');

// Export model as a function
module.exports = (sequelize) => {
    sequelize.define('PolygonPoints', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        latitude: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        longitude: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            timestamps: false,
            tableName: "point_polygon"
        });
};