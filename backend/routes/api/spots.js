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
const { queryCheck } = require("../../utils/query");

const Sequelize = require("sequelize");
const { Op } = require("sequelize");

//Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res, next) => {
  let allspots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
    // attributes: {
    //   include: [
    //     [
    //       Sequelize.literal(`(
    //               SELECT url
    //               FROM SpotImages
    //               WHERE
    //                   SpotImages.preview = true
    //                   AND
    //                   SpotImages.spotId = Spot.id
    //           )`),
    //       "previewImage",
    //     ],
    //   ],
    // },
  });

  allspots = allspots.map((spot) => spot.toJSON());

  for (let spot of allspots) {
    const total = await Review.sum("stars", {
      where: {
        spotId: spot.id,
      },
    });

    const num = await Review.count({
      where: {
        spotId: spot.id,
      },
    });

    const avg = (total / num).toFixed(2);

    const previewUrl = await SpotImage.findOne({
      where: {
        spotId: spot.id,
      },
    });

    if (num !== 0) {
      spot.avgRating = `★${avg}`;
    } else spot.avgRating = "★ New"

    // if (previewUrl === null) {
    //   spot.previewImage = "No preview images yet";
    // } else 
    spot.previewImage = previewUrl.url;
  }

  return res.json({ Spots: allspots });
  
});

//Get details for a Spot from an id
router.get("/:spotId", validators.checkExist, async (req, res, next) => {
  const targetSpot = await Spot.findByPk(req.params.spotId, {
    include: [
      { association: "SpotImages", attributes: ["id", "url", "preview"] },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
        as: "Owner",
      },
    ],
  });

  const spotDetail = targetSpot.toJSON();

  const total = await Review.sum("stars", {
    where: {
      spotId: req.params.spotId,
    },
  });

  const num = await Review.count({
    where: {
      spotId: req.params.spotId,
    },
  });

  const avg = (total / num).toFixed(2);

  spotDetail.numReviews = num;

  if (total !== null) {
    spotDetail.avgRating = `★${avg}`;
  } else spotDetail.avgRating = "★ New";

  return res.json(spotDetail);
});

//get all spots
router.get("/", queryCheck, async (req, res, next) => {
  const { where, pagination } = req;
  let allspots = await Spot.findAll({
    where,
    ...pagination,
    // attributes: {
    // include: [
    //   [
    //     Sequelize.literal(`(
    //               SELECT url
    //               FROM SpotImages
    //               WHERE
    //                   SpotImages.preview = true
    //                   AND
    //                   SpotImages.spotId = Spot.id
    //           )`),
    //     "previewImage",
    //   ]
    // ],
    // },

    // include: [{ model: SpotImage, attributes: ["url"] }],

    // attributes: {
    //   include: [
    //     [Sequelize.fn("sum", Sequelize.col("spot.price")), "minPrice"],

    //   ],
    // },
  });

  allspots = allspots.map((spot) => spot.toJSON());

  for (let spot of allspots) {
    const total = await Review.sum("stars", {
      where: {
        spotId: spot.id,
      },
    });

    const num = await Review.count({
      where: {
        spotId: spot.id,
      },
    });

    const avg = (total / num).toFixed(2);

    const previewUrl = await SpotImage.findOne({
      where: {
        spotId: spot.id,
      },
      attributes: ["url"],
    });

    if (num !== 0) {
      spot.avgRating = `★ ${avg}`;
    } else {
      spot.avgRating = "★ New";
    }

    if (previewUrl === null) {
      spot.previewImage = "No preview images yet";
    } else {
      spot.previewImage = previewUrl.url;
    }
  }

  return res.json({
    Spots: allspots,
    page: parseInt(req.page),
    size: parseInt(req.size),
  });
});

//Get all Reviews by a Spot's id
router.get(
  "/:spotId/reviews",
  validators.checkExist,
  async (req, res, next) => {
    const targetReview = await Review.findAll({
      where: {
        spotId: req.params.spotId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
    });

    // const spotDetail = targetSpot.toJSON();

    // if (Object.keys(targetReview).length == 0) {
    return res.json({ Reviews: targetReview });
    // } else res.json({ message: "No reviews yet." });
  }
);

// create a new spot
router.post(
  "/",
  requireAuth,
  validators.validateSpotCreate,
  async (req, res) => {
    const body = req.body;
    body.ownerId = req.user.id;
    const spot = await Spot.build(body);
     try {
       await spot.validate();
       await spot.save();
       res.json(spot);
     } catch (e) {
       res.statusCode = 400;
       res.json(e);
     }
  }
);

//edit a spot
router.put(
  "/:spotId",
  requireAuth,
  validators.checkExist,
  validators.checkOwner,
  validators.validateSpotCreate,
  async (req, res, next) => {
    let targetSpot = await Spot.findByPk(req.params.spotId);
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    targetSpot.set({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
    });

    await targetSpot.save();
    res.json(targetSpot);
  }
);

//delete a spot
router.delete(
  "/:spotId",
  requireAuth,
  validators.checkExist,
  validators.checkOwner,
  async (req, res, next) => {
    const deleteSpot = await Spot.findByPk(req.params.spotId);
    await deleteSpot.destroy();
    res.json({ message: "Successfully deleted" });
  }
);

// Add an Image to a Spot based on the Spot's id
router.post(
  "/:spotId/images",
  requireAuth,
  validators.checkExist,
  validators.checkOwner,
  async (req, res, next) => {
    const { url, preview } = req.body;

    const newImage = SpotImage.build({
      spotId: req.params.spotId,
      url,
      preview,
    });

    await newImage.save();

    res.json({ id: newImage.id, url: newImage.url, preview: newImage.preview });
  }
);

//Create a Review for a Spot based on the Spot's id
router.post(
  "/:spotId/reviews",
  requireAuth,
  validators.checkExist,
  validators.validateReviewCreate,
  async (req, res, next) => {
    const { review, stars } = req.body;
    const userID = req.user.id;

    const existReview = await Review.findOne({
      where: {
        userId: userID,
        spotId: req.params.spotId,
      },
    });

    // console.log(existReview);
    if (!existReview) {
      const newReview = Review.build({
        spotId: req.params.spotId,
        userId: userID,
        review,
        stars,
      });

      await newReview.save();
      res.status(201).json(newReview);
    } else {
      res
        .status(500)
        .json({ message: "User already has a review for this spot" });
    }
  }
);

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, validators.checkExist, 
validators.checkSpotOwner, validators.validateBookingCreate, async (req, res, next) => {
    let { startDate, endDate } = req.body;
    const userID = req.user.id;

    startDate = new Date(startDate).toISOString();
    endDate = new Date(endDate).toISOString();

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

        spotId: req.params.spotId,
      },
    });

    if (existBooking.length === 0) {
      const newBooking = Booking.build({
        spotId: req.params.spotId,
        userId: userID,
        startDate,
        endDate,
      });

      await newBooking.save();
      res.status(200).json(newBooking);
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

//Get all Bookings for a Spot based on the Spot's id
router.get(
  "/:spotId/bookings",
  requireAuth,
  validators.checkExist,
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    let booking;
    if (spot.ownerId === req.user.id) {
      booking = await Booking.findAll({
        where: {
          spotId: req.params.spotId,
        },
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      });
      return res.json({ Bookings: booking });
    }
    {
      booking = await Booking.findAll({
        where: {
          spotId: req.params.spotId,
        },
        attributes: ["spotId", "startDate", "endDate"],
      });
      return res.json({ Bookings: booking });
    }
  }
);

module.exports = router;
