const { handleValidationErrors } = require("./validation");
const { check } = require("express-validator");

const { Spot, Review, SpotImage, ReviewImage, Booking } = require("../db/models");
const { param } = require("../routes/api/spots");

const validators = {
  validateSpotCreate: [
    check("address")
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    check("city").exists({ checkFalsy: true }).withMessage("City is required"),
    check("state")
      .exists({ checkFalsy: true })
      .withMessage("State is required"),
    check("country")
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
    check("lat")
      .exists({ checkNull: true })
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude is not valid"),
    check("lng")
      .exists({ checkNull: true })
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude is not valid"),
    check("name")
      .exists({ checkFalsy: true })
      .isLength({ max: 49 })
      .withMessage("Name must be less than 50 characters"),
    check("description")
      .exists({ checkFalsy: true })
      .withMessage("Description is required"),
    check("price")
      .exists({ checkFalsy: true })
      .isFloat({ min: 0 })
      .withMessage("Price per day is required and must be greater than 0"),
    handleValidationErrors,
  ],

  validateReviewCreate: [
    check("review")
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check("stars")
      .exists({ checkFalsy: true })
      .isInt({ gt: 0, lt: 6 })
      .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
  ],

  validateBookingCreate: [
    check("endDate")
      .exists({ checkFalsy: true })
      .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
  ],

  checkExist: async (req, res, next) => {
    //check if spotId is included in request
    if (req.params.spotId) {
      const spot = await Spot.findByPk(req.params.spotId);

      //check if spot is exsiting.
      if (!spot) {
        res.status(404).json({ message: "Spot couldn't be found" });
      }
    }

    //check if imageId is included in request
    if (req.params.imageId) {
      let image;

      if (req.originalUrl.split("/")[2] === "spot-images") {
        image = await SpotImage.findByPk(req.params.imageId);
        //check if image is exsiting.
        if (!image) {
          res.status(404).json({ message: "Spot Image couldn't be found" });
        }
      }

      if (req.originalUrl.split("/")[2] === "review-images") {
        image = await ReviewImage.findByPk(req.params.imageId);
        if (!image) {
          res.status(404).json({ message: "Review Image couldn't be found" });
        }
      }
    }

    //check if reviewId is included in request
    if (req.params.reviewId) {
      const review = await Review.findByPk(req.params.reviewId);
      // console.log("result"+req.params.reviewId)
      // console.log("reeee"+review)

      //check if review is exsiting.
      if (!review) {
        res.status(404).json({ message: "Review couldn't be found" });
      }
    }

    //check if bookingId is included in request
    if (req.params.bookingId) {
      const booking = await Booking.findByPk(req.params.bookingId);

      //check if booking is exsiting.
      if (!booking) {
        res.status(404).json({ message: "Booking couldn't be found" });
      }
    }

    next();
  },

  checkOwner: async (req, res, next) => {
    //check if spotId is included in request
    if (req.params.spotId) {
      const spot = await Spot.findByPk(req.params.spotId);

      //check owner authorization.
      if (req.user.id !== spot.ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
      }
      delete spot;
    }

    //check if imageId is included in request
    if (req.params.imageId) {
      let image;
      let spot;
      let review;
      if (req.originalUrl.split("/")[2] === "spot-images") {
        image = await SpotImage.findByPk(req.params.imageId);
        spot = await Spot.findByPk(image.spotId);
        if (spot.ownerId !== req.user.id) {
          const err = new Error("Forbidden");
          err.status = 403;
          return next(err);
        }
      }

      if (req.originalUrl.split("/")[2] === "review-images") {
        image = await ReviewImage.findByPk(req.params.imageId);
        review = await Review.findByPk(image.reviewId);
        if (review.userId !== req.user.id) {
          const err = new Error("Forbidden");
          err.status = 403;
          return next(err);
        }
      }

      delete image;
      delete spot;
      delete review;
    }

    //check if reviewId is included in request
    if (req.params.reviewId) {
      const review = await Review.findByPk(req.params.reviewId);
      // console.log("result"+image.spotId)

      //check owner authorization.
      if (req.user.id !== review.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
      }
      delete review;
    }

    //check if bookingId is included in request
    if (req.params.bookingId) {
      const booking = await Booking.findByPk(req.params.bookingId);

      //check owner authorization.
      if (req.user.id !== booking.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
      }
      delete booking;
    }
    next();
  },

  // check if the spot is owned by the user
  checkSpotOwner: async (req, res, next) => {
    //check if spotId is included in request
    if (req.params.spotId) {
      const spot = await Spot.findByPk(req.params.spotId);

      //check owner authorization.
      if (req.user.id === spot.ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
      }
      delete spot;
    }

    next();
  },
};



module.exports = validators;
