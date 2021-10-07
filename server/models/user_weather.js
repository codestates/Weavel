"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_weather extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_weather.init(
    {
      userId: DataTypes.STRING,
      weaterId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_weather",
    },
  );
  return user_weather;
};
