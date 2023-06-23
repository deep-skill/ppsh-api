const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "w_one",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Y_y: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      Y_z: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      Y_mc: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      Y_ab: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      Y_bc: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "w_one"
    }
  );
};
