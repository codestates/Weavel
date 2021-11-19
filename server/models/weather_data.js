"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class weather_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  weather_data.init(
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
      modelName: "weather_data",
      freezeTableName: true,
    },
  );
  return weather_data;
};
