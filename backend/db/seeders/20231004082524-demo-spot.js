"use strict";

const { Spot } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "93 NORTH 9TH STREET, BROOKLYN NY 11211",
          city: "Brooklyn",
          state: "NY",
          country: "United States",
          name: "SOHO 93",
          description: "zip 11211",
          price: 120,
        },
        {
          ownerId: 1,
          address: "380 WESTMINSTER ST, PROVIDENCE RI 02903",
          city: "Providence",
          state: "RI",
          country: "United States",
          name: "SOHO 380",
          description: "zip 02903",
          price: 99.5,
        },
        {
          ownerId: 2,
          address: "177 MAIN STREET, LITTLETON NH 03561",
          city: "Littleton",
          state: "NH",
          country: "United States",
          name: "SOHO 177",
          description: "zip 03561",
          price: 95,
        },
        {
          ownerId: 2,
          address: "202 HARLOW ST, BANGOR ME 04401",
          city: "Bangor",
          state: "ME",
          country: "United States",
          name: "SOHO 202",
          description: "zip 04401",
          price: 80.9,
        },
        {
          ownerId: 3,
          address: "46 FRONT STREET, WATERVILLE, ME 04901",
          city: "Waterville",
          state: "ME",
          country: "United States",
          name: "SOHO 46",
          description: "zip 04901",
          price: 150,
        },
        {
          ownerId: 3,
          address: "22 SUSSEX ST, HACKENSACK NJ 07601",
          city: "Hackensack",
          state: "NJ",
          country: "United States",
          name: "SOHO 22",
          description: "zip 07601",
          price: 150,
        },
        {
          ownerId: 4,
          address: "75 OAK STREET, PATCHOGUE NY 11772",
          city: "Patchogue",
          state: "NY",
          country: "United States",
          name: "SOHO 75",
          description: "zip 11772",
          price: 200.8,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
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