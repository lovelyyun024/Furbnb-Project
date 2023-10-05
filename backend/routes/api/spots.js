const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage } = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const validators = require("../../utils/routevalidator");

const Sequelize = require("sequelize");

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
  "/",requireAuth, validators.validateSpotCreate, async (req, res, next) => {
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
  validators.checkOwner,validators.validateSpotCreate,
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

   

    // if(targetSpot.ownerId === req.user.id){
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

    // } else{
    //   res.json({ message: "You don't have athroization to edit this spot" });
    // }
  }
);

module.exports = router;
