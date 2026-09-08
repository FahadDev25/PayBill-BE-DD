const { check } = require("express-validator/check");

exports.loginValidations = [
  check("phone")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Phone number can not be empty!")
    .isInt()
    .withMessage("Phone number must be a NUMBER!")
    .isLength({ min: 11, max: 11 })
    .withMessage("Length must be 11!"),
];
exports.verifyValidations = [
  check("phone")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Phone number can not be empty!")
    .isInt()
    .withMessage("Phone number must be a NUMBER!")
    .isLength({ min: 11, max: 11 })
    .withMessage("Length must be 11!"),
  check("otp")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("OTP can not be empty!")
    .isInt()
    .withMessage("OTP must be a NUMBER!")
    .isLength({ min: 4, max: 4 })
    .withMessage("Length must be 4!"),
];
