const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const validators = require("../../utils/routevalidator");

const Sequelize = require("sequelize");

//Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res, next) => {
  let curbookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: Spot,
        attributes: { exclude: ["createdAt", "updatedAt", "description"] },
      },
    ],
  });

 const bookings = [];

 for (const booking of curbookings) {
   const bookingObj = booking.toJSON();
   const spotImage = await SpotImage.findOne({
     where: {
       spotId: bookingObj.Spot.id,
       preview: true,
     },
   });

   if (spotImage) bookingObj.Spot.previewImage = spotImage.url;

   bookings.push(bookingObj);
 }
 res.json({Bookings: bookings});
});


module.exports = router;
