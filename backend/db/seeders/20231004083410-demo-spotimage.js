"use strict";

const { SpotImage } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://www.example.com/1",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://www.example.com/2",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://www.example.com/3",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://www.example.com/4",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://www.example.com/5",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://www.example.com/6",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://www.example.com/7",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://www.example.com/8",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://www.example.com/9",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://www.example.com/10",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://www.example.com/11",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://www.example.com/12",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://www.example.com/13",
          preview: true
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
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
