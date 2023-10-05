const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, SpotImage, ReviewImage } = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const validators = require("../../utils/routevalidator");

const Sequelize = require("sequelize");

//Edit a Review
router.put(
  "/:reviewId",
  requireAuth,
  validators.checkExist,
  validators.checkOwner,
  validators.validateReviewCreate,
  async (req, res, next) => {
    // let targetRev = await Review.findByPk(req.params.reviewId);
    const targetRev = await Review.findOne({
      where: {
        id: req.params.reviewId,
      },
    });
    const { review, stars } = req.body;

    targetRev.set({
      review,
      stars,
      updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
    });

    await targetRev.save();
    res.json(targetRev);
  }
);

//Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res, next) => {
  const targetReview = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: { exclude: ['createdAt', 'updatedAt']},
        // include:[{
        //      model:SpotImage,
        //      attributes:["url"],
        // }]
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  // const spotDetail = targetSpot.toJSON();

  // if (Object.keys(targetReview).length == 0) {
//   res.json({ Reviews: targetReview });
  // } else res.json({ message: "No reviews yet." });

    const reviews = [];

    for (const review of targetReview) {
      const reviewObj = review.toJSON();
      const spotImage = await SpotImage.findOne({
        where: {
          spotId: reviewObj.Spot.id,
          preview: true,
        },
      });

      if (spotImage) reviewObj.Spot.previewImage = spotImage.url;
        reviews.push(reviewObj);
    }
    res.json({ Reviews: reviews });
});

module.exports = router;
