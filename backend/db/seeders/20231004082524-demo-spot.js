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
            "Welcome to Urban Oasis Retreat, our stylish 1-bedroom apartment in the heart of Tacoma. This modern space boasts an open-concept design, a fully equipped kitchen, and a private balcony with city views. Enjoy the comfort of a queen-size bed, stay connected with high-speed Wi-Fi and a Smart TV, and take advantage of the convenient workspace. Centrally located, you'll be within walking distance of top attractions, restaurants, and entertainment. Easy access to public transportation makes exploring the city a breeze. Your hosts are dedicated to ensuring a memorable stay—ask us for local tips and recommendations. Book your stay at Urban Oasis Retreat for a perfect blend of convenience and tranquility in the bustling city.",
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
            "Welcome to our charming coastal cottage, just steps away from the sandy shores of [Beach Name]. This 2-bedroom retreat is perfect for beach lovers seeking a tranquil getaway. Enjoy the ocean breeze from the private patio, unwind in the cozy living room, and explore the nearby seaside attractions. With a fully equipped kitchen and beach essentials provided, your coastal escape awaits.",
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
            "Discover urban living at its finest in our modern loft located in the vibrant Arts District of [City Name]. This industrial-chic space features exposed brick, high ceilings, and curated art pieces. The loft includes a spacious living area, a designer kitchen, and a stylish bedroom. Immerse yourself in the local arts scene, explore trendy galleries, and dine at hip cafes—all just steps away.",
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
            "Escape to the tranquility of our mountain retreat nestled in the heart of [Mountain Range]. This 3-bedroom cabin offers breathtaking views, a rustic-chic interior, and a cozy fireplace. Hike scenic trails, relax on the spacious deck, and stargaze from the outdoor hot tub. Perfect for nature enthusiasts and those seeking a peaceful mountain getaway.",
          lat: 37.7645358,
          lng: 32.4730327,
          price: 80.9,
        },
        {
          ownerId: 3,
          address: "46 FRONT STREET, WATERVILLE, ME 04901",
          city: "Waterville",
          state: "ME",
          country: "United States",
          name: "Historic Townhouse in the City Center",
          description:
            "Step back in time with a stay in our meticulously restored historic townhouse in the heart of [City Center]. This 4-bedroom gem seamlessly combines classic elegance with modern amenities. Walk to nearby historical sites, dine in charming local eateries, and experience the rich culture of the city—all from the comfort of your beautifully preserved home away from home.",
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
            "Make memories in our family-friendly 3-bedroom suburban retreat located in a quiet neighborhood in [Suburb Name]. The spacious backyard is perfect for kids to play, and the fully equipped kitchen makes family meals a breeze. Explore nearby parks, visit family-friendly attractions, and relax in the comfort of a home designed for quality family time.",
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
          name: "Trendy Studio in the Artsy Neighborhood",
          description:
            "Immerse yourself in the artsy vibes of [Artsy Neighborhood] with a stay in our trendy studio apartment. This compact yet stylish space is perfect for solo travelers or couples looking to explore the local arts and culture scene. Walk to eclectic boutiques, dine in trendy cafes, and experience the unique energy of this vibrant neighborhood during your stay.",
          lat: -87.7645358,
          lng: 72.4730327,
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
        name: {
          [Op.in]: [
            "SOHO 93",
            "SOHO 380",
            "SOHO 177",
            "SOHO 202",
            "SOHO 46",
            "SOHO 22",
            "SOHO 75",
          ],
        },
      },
      {}
    );
  },
};
