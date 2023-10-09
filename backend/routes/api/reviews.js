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
    const targetRev = await Review.findByPk(req.params.reviewId);
    // const targetRev = await Review.findOne({
    //   where: {
    //     id: req.params.reviewId,
    //   },
    // });
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
        attributes: {
          exclude: ["createdAt", "updatedAt", "description"],
          include: [
            [
              Sequelize.literal(`(
                  SELECT url
                  FROM SpotImages
                  WHERE
                      SpotImages.preview = true
                      AND
                      SpotImages.spotId = Spot.id
              )`),
              "previewImage",
            ],
          ],
        },
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"]
      },
    ],
  });

    res.json({ Reviews: targetReview });
});

//delete a review
router.delete("/:reviewId",requireAuth, validators.checkExist, validators.checkOwner,
  async (req, res, next) => {
    const deleteReview = await Review.findByPk(req.params.reviewId);
    await deleteReview.destroy();
    res.json({ message: "Successfully deleted" });
  }
);

//Add an Image to a Review based on the Review's id
router.post("/:reviewId/images",requireAuth, validators.checkExist, validators.checkOwner,
  async (req, res, next) => {
    const { url } = req.body;
    const ImgNum = await ReviewImage.count({
      where: {
        reviewId: req.params.reviewId
      }
    });
   
    if(ImgNum < 10){
    const newImage = ReviewImage.build({
      reviewId: req.params.reviewId,
      url,
    });

    await newImage.save();

    res.json({ id: newImage.id, url: newImage.url })
   } res.status(403).json({
     message: "Maximum number of images for this resource was reached",
   });
  }
);

module.exports = router;
