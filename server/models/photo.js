"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  photo.init(
    {
      userId: DataTypes.STRING,
      image: DataTypes.STRING,
      weather: DataTypes.STRING,
      date: DataTypes.STRING,
      area: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "photo",
      freezeTableName: true,
    },
  );
  return photo;
};
