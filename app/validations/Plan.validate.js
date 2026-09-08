const { check } = require("express-validator/check");
const db = require("../models");

exports.storeValidations = [
  check("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title can not be empty!")
    .isString()
    .withMessage("Title must be a STRING!"),
  check("features")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Features can not be empty!")
    .isString()
    .withMessage("Features must be a STRING!"),
  check("is_active")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Is active can not be empty!")
    .isBoolean()
    .withMessage("Is active must be a BOOLEAN!"),
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
      return db.user_bills.findOne({ where: { id: value } }).then((data) => {
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
      return db.user_bills.findOne({ where: { id: value } }).then((data) => {
        if (!data) {
          return Promise.reject("ID dosen't exist");
        }
      });
    }),
  check("bill_company_id")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Bill Company ID must be a NUMBER!")
    .custom((value) => {
      return db.bill_companies
        .findOne({ where: { id: value } })
        .then((data) => {
          if (!data) {
            return Promise.reject("Bill Company ID Doesn't exist");
          }
        });
    }),
  check("bill_amount")
    .trim()
    .escape()
    .optional()
    .isInt()
    .withMessage("Bill amount must be a NUMBER!"),
  check("is_payed")
    .trim()
    .escape()
    .optional()
    .isBoolean()
    .withMessage("Bill amount must be a BOOLEAN!"),
  check("is_active")
    .trim()
    .escape()
    .optional()
    .isBoolean()
    .withMessage("Bill amount must be a BOOLEAN!"),
  check("bill_picture")
    .trim()
    .escape()
    .optional()
    .isString()
    .withMessage("Bill picture must be a STRING!"),
  check("due_date")
    .trim()
    .optional()
    .isString()
    .withMessage("Bill amount must be a STRING!"),
];

exports.userChoosePlanValidations = [
  check("is_payed")
    .trim()
    .escape()
    .optional()
    .isBoolean()
    .withMessage("Bill amount must be a BOOLEAN!"),
];
