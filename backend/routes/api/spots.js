const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, SpotImage } = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const validators = require("../../utils/routevalidator");

const Sequelize = require("sequelize");

//Get details for a Spot from an id
router.get("/:spotId", validators.checkExist, async (req, res, next) => {
  const targetSpot = await Spot.findByPk(req.params.spotId, {
    include: [
      { association: "SpotImages", attributes: ["id", "url", "preview"] },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
        as: "Owner"
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

  spotDetail.avgRating = total / num;
  spotDetail.numReviews = num;

  return res.json(spotDetail);
});

//get all spots
router.get("/", async (req, res, next) => {
  let allspots = await Spot.findAll({});
  // console.log(typeof allspots)

  //   const firstTweet = await Tweet.findOne({
  //     where: {
  //       id: 1,
  //     },
  //   });

  //   // Later using the tweet to get the user that created the tweet
  //   const tweetOwner = await firstTweet.getUser();

  const spotsJSON = allspots.map((spot) => spot.toJSON());

  for (let spot of spotsJSON) {
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

    spot.avgRating = total / num;

    const img = await SpotImage.findAll({
      where: {
        preview: true,
        spotId: spot.id,
      },
      attributes: ["url"],
    });

    spot.previewImage = img;
  }
  //     const previewImg = await SpotImage.findOne({
  //       where: {
  //         spotId: spot.id,
  //         preview: true
  //       },
  //       attributes: ['url']
  //     });

  //     if (previewImg) {
  //       const imgObj = previewImg.toJSON()
  //       spot.previewImage = imgObj.url
  //     }
  //   }

  // console.log("result"+spot.avgRating)

  //   console.log("aaa" + allspots[0].avgRating)
  //   console.log("json: " + allspots[0].toJSON())

  return res.json({ spots: spotsJSON });
});

// create a new spot
router.post(
  "/",
  requireAuth,
  validators.validateSpotCreate,
  async (req, res, next) => {
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

    console.log(req.user);
    const owner = req.user.id;

    const newSpot = Spot.build({
      ownerId: owner,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    await newSpot.save();

    res.status(201).json(newSpot);
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

//Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res, next) => {
  // console.log(req.user.id);
  let allspots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
  });

  const spotsJSON = allspots.map((spot) => spot.toJSON());

  for (let spot of spotsJSON) {
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

    spot.avgRating = total / num;

    const img = await SpotImage.findAll({
      where: {
        preview: true,
        spotId: spot.id,
      },
      attributes: ["url"],
    });

    spot.previewImage = img;
  }

  return res.json({ spots: spotsJSON });
});

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

module.exports = router;
