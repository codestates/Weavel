"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class weather extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      weather.hasMany(models.user_weather, {
        foreignKey: "weatherId",
      });
    }
  }
  weather.init(
    {
      weather: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "weather",
      freezeTableName: true,
    },
  );
  return weather;
};
