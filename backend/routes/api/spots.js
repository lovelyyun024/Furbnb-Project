const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage } = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSpotCreate = [
  // check("email")
  //   .exists({ checkFalsy: true })
  //   .isEmail()
  //   .withMessage("Please provide a valid email."),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  // check("username").not().isEmail().withMessage("Username cannot be an email."),
  // check("password")
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 6 })
  //   .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

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
router.post("/", requireAuth, validateSpotCreate, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

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
  // try {
  //   newSpot.validate();
  // } catch (err) {
  //   console.log(err);
  // }

  await newSpot.save();

  res.status(201).json(newSpot);
});

module.exports = router;
