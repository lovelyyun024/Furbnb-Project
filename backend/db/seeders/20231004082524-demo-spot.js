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
          name: "Paws & Relax Retreat",
          description:
            "Unwind in our pet-friendly haven, where both you and your furry friend are welcomed with open arms. Enjoy cozy accommodations and explore nearby parks for unforgettable bonding moments.",
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
          name: "Whiskers' Haven Hideaway",
          description:
            " A charming escape designed for pets and their human companions. Immerse yourselves in a tranquil environment, complete with pet amenities and easy access to scenic trails.",
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
          name: "FurryFriends Paradise Cottage",
          description:
            "Your pet's dream vacation awaits! Our cozy cottage is tailored for both pets and owners, offering a delightful blend of comfort, play areas, and nearby pet-friendly attractions.",
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
          name: "Pawfect Getaway Haven",
          description:
            " Discover a haven where pets are pampered and cherished. Enjoy a delightful retreat with personalized pet services, scenic surroundings, and a warm, welcoming atmosphere.",
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
          name: "TailWag Trails Retreat",
          description:
            "Embark on an adventure with your furry friend at our Trails Retreat. Nestled in nature, our pet-friendly accommodations promise a serene escape for both pets and their loving owners.",
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
          name: "PetPamper Palace",
          description:
            "Indulge in luxury with your four-legged companion at our PetPamper Palace. Tailored amenities, spacious accommodations, and a pet-friendly environment ensure a memorable stay for all.",
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
          name: "Bark & Breakfast Boutique",
          description:
            "A charming boutique stay where both you and your pet can enjoy a delightful bed and breakfast experience. Explore nearby parks and unwind in the heart of pet-friendly hospitality.",
          lat: -87.7645358,
          lng: 72.4730327,
          price: 200,
        },
        {
          ownerId: 5,
          address: "123 Shimogamo 4-22",
          city: "Kobe",
          state: "Hyogo",
          country: "Japan",
          name: "FurEver Family Cottage",
          description:
            "Experience a true home away from home with your furry family member. Our cozy cottage is equipped with all the comforts you need for a memorable and pet-friendly stay.",
          lat: -87.7645358,
          lng: 72.4730327,
          price: 100,
        },
        {
          ownerId: 5,
          address: "456 Shinmaruko 700-129",
          city: "Yokohama",
          state: "Kanagawa",
          country: "Japan",
          name: "Purrfect Pet Oasis",
          description:
            "Escape to our oasis where pets reign supreme. With dedicated play areas, cozy corners, and nearby pet-friendly attractions, your stay promises to be nothing short of purrfection.",
          lat: -87.7645358,
          lng: 72.4730327,
          price: 150,
        },
        {
          ownerId: 5,
          address: "789 Shimomeguro 12-29",
          city: "Tokyo",
          state: "Tokyo",
          country: "Japan",
          name: "SnugglePaws Sanctuary",
          description:
            "Nestled in a serene sanctuary, our pet-friendly haven invites you to snuggle up with your furry companion. Enjoy a peaceful getaway with personalized pet amenities.",
          lat: -87.7645358,
          lng: 72.4730327,
          price: 200,
        },
        {
          ownerId: 5,
          address: "742 Minamisenjyu 14-2",
          city: "Tokyo",
          state: "Tokyo",
          country: "Japan",
          name: "Feathered Friends Retreat",
          description:
            "Beyond dog-friendly, our retreat caters to all your feathered and furry friends. Immerse yourself in a tranquil environment where pets of all kinds are welcomed with love.",
          lat: -87.7645358,
          lng: 72.4730327,
          price: 350,
        },
        {
          ownerId: 5,
          address: "742 Koubaku 14-2",
          city: "Uji",
          state: "Kyoto",
          country: "Japan",
          name: "Adventures Unleashed Lodge",
          description:
            "Unleash the adventure with your pet at our lodge. Explore the great outdoors together, then retreat to our cozy accommodations for a restful night in a truly pet-friendly environment.",
          lat: -87.7645358,
          lng: 72.4730327,
          price: 280,
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
          [Op.in]: ["1", "2", "3", "4"],
        },
      },
      {}
    );
  },
};
