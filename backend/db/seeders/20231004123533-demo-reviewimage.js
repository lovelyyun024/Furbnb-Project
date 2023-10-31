"use strict";

const { ReviewImage } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: "http://www.image.com/1",
        },
        {
          reviewId: 1,
          url: "http://www.image.com/2",
        },
        {
          reviewId: 2,
          url: "http://www.image.com/3",
        },
        {
          reviewId: 3,
          url: "http://www.image.com/4",
        },
        {
          reviewId: 3,
          url: "http://www.image.com/5",
        },
        {
          reviewId: 3,
          url: "http://www.image.com/6",
        },
        {
          reviewId: 4,
          url: "http://www.image.com/7",
        },
        {
          reviewId: 4,
          url: "http://www.image.com/8",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        reviewId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
