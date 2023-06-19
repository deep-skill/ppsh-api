const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "location",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING(10),
        defaultValue: null,
      },
      longitude: {
        type: DataTypes.STRING(10),
        defaultValue: null,
      },
      polygon: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
