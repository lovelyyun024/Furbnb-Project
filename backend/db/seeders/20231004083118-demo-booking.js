"use strict";

const { Booking } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 3,
          startDate: "2020-01-01",
          endDate: "2020-01-05",
        },
        {
          spotId: 2,
          userId: 4,
          startDate: "2020-02-01",
          endDate: "2020-02-08",
        },
        {
          spotId: 3,
          userId: 1,
          startDate: "2021-12-01",
          endDate: "2021-12-03",
        },
        {
          spotId: 1,
          userId: 4,
          startDate: "2022-04-22",
          endDate: "2022-04-24",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
