"use strict";

const { Review } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 4,
          review: "Great!",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 2,
          review: "Nice place",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 4,
          review: "Just OK",
          stars: 3,
        },
        {
          spotId: 3,
          userId: 1,
          review: "Would not recommend this place",
          stars: 2,
        },
        {
          spotId: 5,
          userId: 4,
          review: "Avoid this place",
          stars: 1,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 5] },
      },
      {}
    );
  },
};
