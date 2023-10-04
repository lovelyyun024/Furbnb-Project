"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Review.init(
    {
      spotId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      review: { type: DataTypes.STRING, allowNull: false },
      stars: {
        type: DataTypes.INTEGER,
        validate: {
          isIn: {
            args: [[1, 2, 3, 4, 5]],
            msg: "Stars must be an integer from 1 to 5",
          },
        },
      },
    },

    { sequelize, modelName: "Review" }
  );
  return Review;
};
