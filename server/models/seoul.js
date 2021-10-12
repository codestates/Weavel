"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class seoul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  seoul.init(
    {
      city: DataTypes.INTEGER,
      nx: DataTypes.INTEGER,
      ny: DataTypes.INTEGER,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      category: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "seoul",
      freezeTableName: true,
    },
  );
  return seoul;
};
