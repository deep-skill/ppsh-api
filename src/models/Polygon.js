const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    "Polygon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      points: {
        type: DataTypes.STRING(2860),
        defaultValue: null,
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "polygon"
    }
  );
};