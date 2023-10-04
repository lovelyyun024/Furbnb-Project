const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage } = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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

    spot.previewImage = img;}
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

module.exports = router;
