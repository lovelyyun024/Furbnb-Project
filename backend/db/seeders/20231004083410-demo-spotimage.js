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
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel1-1.jpeg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel1-2.jpeg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel1-3.jpeg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel1-4.jpeg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel1-5.jpeg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel2-1.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel2-2.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel2-3.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel2-4.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel2-5.jpg",
          preview: false,
        },

        {
          spotId: 3,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel3-1.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel3-2.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel3-3.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel3-4.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel3-5.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel4-1.jpeg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel4-2.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel4-3.jpeg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel4-4.jpeg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel4-5.jpeg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel5-1.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel5-2.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel5-3.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel5-4.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel6-1.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel6-2.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel6-3.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel6-4.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel7-1.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel7-2.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel7-3.jpeg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel8-1.jpeg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel8-2.jpeg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel8-3.jpeg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel8-4.jpeg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel9-1.jpeg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel9-2.jpeg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel9-3.jpeg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel10-1.jpeg",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel10-2.jpeg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel10-3.jpeg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel10-4.jpeg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel10-5.jpeg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel11-1.jpeg",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel11-2.jpeg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel11-3.jpeg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel11-4.jpeg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel11-5.jpeg",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel12-1.jpeg",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel12-2.jpeg",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://barkbook-bucket.s3.us-west-2.amazonaws.com/furbnb/hotel12-3.jpeg",
          preview: false,
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
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] },
      },
      {}
    );
  },
};
