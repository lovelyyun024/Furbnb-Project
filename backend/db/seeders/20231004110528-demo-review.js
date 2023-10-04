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
          userId: 3,
          review: "OKKKKK",
          stars: 3,
        },
        {
          spotId: 2,
          userId: 4,
          review: "OKKKKK",
          stars: 3,
        },
        {
          spotId: 3,
          userId: 1,
          review: "OKKKKK",
          stars: 3,
        },
        {
          spotId: 5,
          userId: 4,
          review: "OKKKKK",
          stars: 3,
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
        //username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
