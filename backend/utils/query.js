// Checking if query params are named and defined
const { Op } = require("sequelize");
const queryCheck = (req, _res, next) => {
  const pageErr = "Page must be greater than or equal to 1";
  const sizeErr = "Size must be greater than or equal to 1";
  const mnLatErr = "Maximum latitude is invalid";
  const mxLatErr = "Minimum latitude is invalid";
  const mnLngErr = "Maximum longitude is invalid";
  const mxLngErr = "Minimum longitude is invalid";
  const minPriceErr = "Minimum price must be greater than or equal to 0";
  const maxPriceErr = "Maximum price must be greater than or equal to 0";
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;
  const pagination = {};
  let errorCheck;
  let bottomLat = minLat !== undefined ? minLat : -90;
  let topLat = maxLat !== undefined ? maxLat : 90;
  let bottomLng = minLng !== undefined ? minLng : -180;
  let topLng = maxLng !== undefined ? maxLng : 180;
  let bottomPrice = minPrice !== undefined ? minPrice : 0;
  let topPrice = maxPrice !== undefined ? maxPrice : 99999999;

  //   let query = {
  //     where: {},
  //   };

  const err = new Error("Bad request");
  err.status = 400;
  err.errors = {};

  if (
    page < 1
    // || Number.isInteger(page)
  ) {
    errorCheck = true;
    err.errors.page = pageErr;
  }

  if (size < 1) {
    errorCheck = true;
    err.errors.size = sizeErr;
  }

  if (minLat < -90) {
    errorCheck = true;
    err.errors.minLat = mnLatErr;
  }

  if (maxLat > 90) {
    errorCheck = true;
    err.errors.maxLat = mxLatErr;
  }

  if (minLng < -180) {
    errorCheck = true;
    err.errors.minLng = mnLngErr;
  }

  if (maxLng > 180) {
    errorCheck = true;
    err.errors.maxLng = mxLngErr;
  }

  if (minPrice < 0) {
    errorCheck = true;
    err.errors.minPrice = minPriceErr;
  }

  if (maxPrice < 0) {
    errorCheck = true;
    err.errors.maxPrice = maxPriceErr;
  }

  if (!page) page = 1;
  if (page > 10) page = 10;
  if (size > 20 || !size) size = 20;

  pagination.limit = size;
  pagination.offset = size * (page - 1);

  const where = {
    lat: {
      [Op.between]: [bottomLat, topLat],
    },
    lng: {
      [Op.between]: [bottomLng, topLng],
    },
    price: {
      [Op.between]: [bottomPrice, topPrice],
    },
  };

  req.where = where;
  req.pagination = pagination;

  if (errorCheck) {
    return next(err);
  }
  next();
};

module.exports = {
  queryCheck,
};
