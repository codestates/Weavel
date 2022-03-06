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
      user_weather.belongsTo(models.user, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
      user_weather.belongsTo(models.weather, {
        foreignKey: "weatherId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  user_weather.init(
    {
      userId: DataTypes.INTEGER,
      weatherId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user_weather",
      freezeTableName: true,
    },
  );
  return user_weather;
};
