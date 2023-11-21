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
          url: "https://a0.muscache.com/im/pictures/5766572e-a243-4f5e-9945-edf9be89b2ae.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-6603376/original/9a7d5c6a-87b3-43ea-a42d-f6582a94724b.jpeg?im_w=1200",
          preview: true,
        },

        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-42637728/original/f7bfd23a-2b60-49a0-a6fb-5680eccf1ba1.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-926044431266796134/original/759aa5a2-dd8c-4ef2-823f-5e6174276cc7.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/pictures/56a5f20d-2c1d-4e32-8811-62dc9e1c3609.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://www.travelandleisure.com/thmb/U-yk2LNxx3CaAlZi32QN_SgLxTg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/maryland-airbnb-SOLOAIRBNBS0321-743ce98570374f3eafc7ba51f1b49a51.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/e4369d66-1cbd-440f-a3b2-823a6b03c908.jpeg?im_w=720",
          preview: true,
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
