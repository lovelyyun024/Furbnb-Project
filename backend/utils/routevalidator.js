const { handleValidationErrors } = require("./validation");
const { check } = require("express-validator");

const { Spot, Review, SpotImage } = require("../db/models");

const validators = {
  validateSpotCreate:
    //  [
    //   check("name")
    //     .isLength({ max: 49 })
    //     .withMessage("Name must be less than 50 characters"),
    //   handleValidationErrors,
    // ],
    [
      check("address")
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
      check("city")
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
      check("state")
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
      check("country")
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
      check("lat")
        .exists({ checkNull: true })
        .withMessage("Latitude is not valid"),
      check("lng")
        .exists({ checkNull: true })
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
        .withMessage("Price per day is required"),
      handleValidationErrors,
    ],

  checkOwner: async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot) {
      if (req.user.id !== spot.ownerId) {
        const err = new Error("You are not authorized.");
        err.status = 403;
        return next(err);
      }
      delete spot;
      next();
    }
  },
};

module.exports = validators;
