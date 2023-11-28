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
          url: "https://a0.muscache.com/im/pictures/1e16f2f4-1256-44cb-a0f2-85aa57672a45.jpg?im_w=960",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-37815537/original/fabca2e5-8120-4222-9af1-7468d93241b5.jpeg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/c05ff63e-8bf1-4a4f-bb20-6782703bb79b.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/f1fa441f-90f7-4ae2-9305-a6258b143e22.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/32ef68c3-d815-45cb-b3c5-97f7eb38d842.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/56467892-0d23-4ab1-8302-9c3d0d5e52cd.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/6f072cb6-0458-4325-acea-eeb8875db36a.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/7bbc0a2a-93e3-4d52-aa6f-9106965a3171.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/a8093003-9769-4f90-a902-54d7da6d0471.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/7dd3fbf8-6d03-4c5a-9a2a-7ef5689b7967.jpg?im_w=720",
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
