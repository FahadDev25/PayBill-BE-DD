const { check } = require("express-validator/check");
const db = require("../models");

exports.storeValidations = [
  check("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Company name can not be empty!")
    .isString()
    .withMessage("Company name must be a string!")
    .isLength({ min: 2 })
    .withMessage("Minimum Length must be 2!")
    .custom((value) => {
      return db.bill_companies
        .findOne({ where: { name: value } })
        .then((data) => {
          if (data) {
            return Promise.reject("Company Name already taken");
          }
        });
    }),
  check("bill_type")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Bill Type name can not be empty!")
    .isString()
    .withMessage("Bill Type name must be a string!")
    .isLength({ min: 2 })
    .withMessage("Minimum Length must be 2!"),
];
exports.getOneValidations = [
  check("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("ID can not be empty!")
    .isInt()
    .withMessage("Id must be a NUMBER!")
    .custom((value) => {
      return db.bill_companies
        .findOne({ where: { id: value } })
        .then((data) => {
          if (!data) {
            return Promise.reject("ID dosen't exist");
          }
        });
    }),
];
exports.updateValidations = [
  check("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("ID can not be empty!")
    .isInt()
    .withMessage("Id must be a NUMBER!")
    .custom((value) => {
      return db.bill_companies
        .findOne({ where: { id: value } })
        .then((data) => {
          if (!data) {
            return Promise.reject("ID dosen't exist");
          }
        });
    }),
  check("name")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Company name must be a string!")
    .isLength({ min: 2 })
    .withMessage("Minimum Length must be 2!")
    .custom((value, { req }) => {
      return db.bill_companies
        .findOne({ where: { name: value } })
        .then(async (data) => {
          const d = await db.bill_companies.findAll({
            where: { id: req.body.id, name: value },
          });
          if (d != "") {
            if (data.name == d[0]["name"]) {
              return true;
            }
          }
          if (data) {
            return Promise.reject("Company Name already taken");
          }
        });
    }),
  check("bill_type")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Bill Type name must be a string!")
    .isLength({ min: 2 })
    .withMessage("Minimum Length must be 2!"),
];
