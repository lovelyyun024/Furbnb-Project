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
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-14886949/original/a9d72542-cd1f-418d-b070-a73035f94fe4.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-14886949/original/b4793edc-0777-4846-b272-c7d9ba031e7d.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-14886949/original/c16fc310-d5b4-4401-8092-85fcea57faf0.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-14886949/original/0e0bde73-d928-4fe6-b79d-cdb19e593d16.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-14886949/original/1de76753-6163-4206-92fb-c87b50fb7ac6.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/f192135e-4df8-4d86-9cda-8e4c72fc5d93.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/38920ae7-dbbf-4012-a222-5990dbc73dc9.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/442171aa-c5cf-402d-a4e5-689a6e4da754.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/2476f261-7505-468e-bd16-438087b83e04.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-50165906/original/2b1ded61-ff49-45a9-b131-29642ddca1a5.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51236591/original/5fddab0b-6271-4527-9874-12e2c69d54d8.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53310687/original/6cc8a56c-b72e-4d22-9b89-3a0eb122d5ed.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53310687/original/682cb694-8b02-4072-9be1-d2c44d403911.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53310687/original/32c4c598-ccdf-4280-8c56-cc47b92ae63c.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53310687/original/fe7e5de6-de7e-44b5-8625-6883c933b5f6.jpeg?im_w=720",
          preview: true,
        },

        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/8d4a8270-9638-4e98-a9eb-17ed0b3f6a78.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/2b39e799-e7c4-4d23-bdea-d63c457f76e3.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/c812472e-23ab-441f-a019-914e9e0c266b.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/47b77aca-f7c8-41d0-b43d-26f2ac0a91a2.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/213c82d8-b259-4969-b807-3f60a42c8e9b.jpg?im_w=720",
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
