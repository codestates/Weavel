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
      photo.belongsTo(models.user, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  photo.init(
    {
      userId: DataTypes.STRING,
      image: DataTypes.STRING,
      weather: DataTypes.STRING,
      date: DataTypes.STRING,
      area: DataTypes.STRING,
      comment: DataTypes.STRING,
      filename: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "photo",
      freezeTableName: true,
    },
  );
  return photo;
};
