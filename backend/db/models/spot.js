"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: "ownerId" });

      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        hooks: true,
      });

      Spot.belongsToMany(models.User, {
        through: models.Booking,
        foreignKey: "spotId",
        otherKey: "userId",
      });

      Spot.belongsToMany(models.User, {
        through: models.Review,
        foreignKey: "spotId",
        otherKey: "userId",
      });
    }
  }
  Spot.init(
    {
      ownerId: DataTypes.INTEGER,
      address: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
      lat: {
        type: DataTypes.FLOAT,
        validate: {
          // args: {
          //   max: 90,
          //   min: -90,
          // },
          // msg: "Latitude is not valid",
          max: {
            args: 90,
            msg: "Latitude is not valid",
          },
          min: {
            args: -90,
            msg: "Latitude is not valid",
          },
        },
      },
      lng: {
        type: DataTypes.FLOAT,
        validate: {
          // args: {
          //   max: 180,
          //   min: -180,
          // },
          // msg: "Longitude is not valid",
          max: {
            args: 180,
            msg: "Longitude is not valid",
          },
          min: {
            args: -180,
            msg: "Longitude is not valid",
          },
        },
      },
      name: {
        type: DataTypes.STRING(50),
        validate: {
          len: [5, 50],
        },
      },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
