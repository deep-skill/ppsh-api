const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "zer4",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      period: {
        type: DataTypes.STRING(5),
        defaultValue: null,
      },
      X: {
        type: DataTypes.STRING(10),
        defaultValue: null,
      },
      Y_y: {
        type: DataTypes.STRING(30),
        defaultValue: null,
      },
      Y_z: {
        type: DataTypes.STRING(30),
        defaultValue: null,
      },
      Y_mc: {
        type: DataTypes.STRING(30),
        defaultValue: null,
      },
      Y_ab: {
        type: DataTypes.STRING(30),
        defaultValue: null,
      },
      Y_bc: {
        type: DataTypes.STRING(30),
        defaultValue: null,
      },
    },
    {
      timestamps: false,
    }
  );
};