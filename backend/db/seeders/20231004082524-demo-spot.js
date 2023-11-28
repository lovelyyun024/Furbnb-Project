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
          city: "Tacoma",
          state: "WA",
          country: "United States",
          name: "Urban Haven Hideaway",
          description:
            "Charming 2BR, 1BA Airbnb in the heart of [City]. Stylish decor, modern amenities, and a cozy atmosphere. Explore nearby attractions and relax in comfort. Book your stay for a memorable experience!",
          lat: 31.7645358,
          lng: 37.4730327,
          price: 80,
        },
        {
          ownerId: 1,
          address: "380 WESTMINSTER ST, PROVIDENCE RI 02903",
          city: "Providence",
          state: "RI",
          country: "United States",
          name: "Coastal Cottage Escape",
          description:
            "Welcome to our charming coastal cottage, just steps away from the sandy shores of Providence. ",
          lat: 35.7645358,
          lng: 35.4730327,
          price: 65,
        },
        {
          ownerId: 2,
          address: "177 MAIN STREET, LITTLETON NH 03561",
          city: "Littleton",
          state: "NH",
          country: "United States",
          name: "Modern Loft in the Arts District",
          description:
            "Discover urban living at its finest in our modern loft located in the vibrant Arts District of Littleton. ",
          lat: 32.7645358,
          lng: 32.4730327,
          price: 108,
        },
        {
          ownerId: 2,
          address: "202 HARLOW ST, BANGOR ME 04401",
          city: "Bangor",
          state: "ME",
          country: "United States",
          name: "Serene Mountain Retreat",
          description:
            "Escape to the tranquility of our mountain retreat nestled in the heart of Bangor. ",
          lat: 37.7645358,
          lng: 32.4730327,
          price: 80,
        },
        {
          ownerId: 3,
          address: "46 FRONT STREET, WATERVILLE, ME 04901",
          city: "Waterville",
          state: "ME",
          country: "United States",
          name: "Historic Townhouse in the City Center",
          description:
            "Step back in time with a stay in our meticulously restored historic townhouse in the heart of Waterville.",
          lat: 77.7645358,
          lng: -82.4730327,
          price: 150,
        },
        {
          ownerId: 3,
          address: "22 SUSSEX ST, HACKENSACK NJ 07601",
          city: "Hackensack",
          state: "NJ",
          country: "United States",
          name: "Family-Friendly Suburban Retreat",
          description:
            "Make memories in our family-friendly 3-bedroom suburban retreat located in a quiet neighborhood in Hackensack. ",
          lat: 87.7645358,
          lng: -72.4730327,
          price: 150,
        },
        {
          ownerId: 4,
          address: "75 OAK STREET, PATCHOGUE NY 11772",
          city: "Patchogue",
          state: "NY",
          country: "United States",
          name: "Trendy Studio in the Patchogue",
          description:
            "Immerse yourself in the artsy vibes of Patchogue with a stay in our trendy studio apartment. ",
          lat: -87.7645358,
          lng: 72.4730327,
          price: 200,
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
        ownerId: {
          [Op.in]: [
            "1",
            "2",
            "3",
            "4"
          ],
        },
      },
      {}
    );
  },
};
