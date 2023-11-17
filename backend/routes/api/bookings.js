const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  Review,
  SpotImage,
  ReviewImage,
  Booking,
} = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const validators = require("../../utils/routevalidator");

const Sequelize = require("sequelize");
const { Op } = require("sequelize");

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
  res.json({ Bookings: bookings });
});

//Edit a Booking
router.put(
  "/:bookingId",
  requireAuth,
  validators.checkExist,
  validators.checkOwner,
  validators.validateBookingCreate,
  async (req, res, next) => {
    const targetBooking = await Booking.findByPk(req.params.bookingId);
    let { startDate, endDate } = req.body;

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (new Date() > new Date(targetBooking.endDate)) {
      res.status(403).json({
        message: "Past bookings can't be modified",
      });
    }

    const existBooking = await Booking.findAll({
      where: {
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: startDate } },
              { endDate: { [Op.gte]: endDate } },
            ],
          },
        ],
        spotId: targetBooking.spotId,
        id: { [Op.ne]: req.params.bookingId },
      },
    });

    //   console.log("res   "+new Date());
    //   console.log("res   " + new Date(targetBooking.endDate));

    if (existBooking.length === 0) {
      targetBooking.set({
        startDate,
        endDate,
        updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
      });
      // targetBooking.startDate = startDate;
      // targetBooking.endDate = endDate;
      // targetBooking.updatedAt = Sequelize.literal("CURRENT_TIMESTAMP");

      await targetBooking.save();
      res.json(targetBooking);
    } else {
      res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
  }
);

//Delete a Booking
router.delete(
  "/:bookingId",
  requireAuth,
  validators.checkExist,
  validators.checkOwner,
  async (req, res, next) => {
    const deleteBooking = await Booking.findByPk(req.params.bookingId);
    if (new Date() < new Date(deleteBooking.startDate)) {
      await deleteBooking.destroy();
      res.json({ message: "Successfully deleted" });
    }
    {
      res.status(403).json({
        message: "Bookings that have been started can't be deleted",
      });
    }
  }
);

module.exports = router;
