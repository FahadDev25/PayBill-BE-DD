const { check } = require("express-validator/check");
const db = require("../models");

exports.storeValidations = [
  check("bill_company_id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Bill Company ID can not be empty!")
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
    .notEmpty()
    .withMessage("Bill amount can not be empty!")
    .isInt()
    .withMessage("Bill amount must be a NUMBER!"),
  check("is_payed")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Bill amount can not be empty!")
    .isBoolean()
    .withMessage("Bill amount must be a BOOLEAN!"),
  check("is_active")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Bill amount can not be empty!")
    .isBoolean()
    .withMessage("Bill amount must be a BOOLEAN!"),
  check("bill_picture")
    .trim()
    .escape()
    .custom((value, { req }) => {
      console.log(req.file.mimetype);
      if (
        req.file.mimetype === "image/jpg" ||
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/png" ||
        req.file.mimetype === "image/svg"
      ) {
        return true; // return "non-falsy" value to indicate valid data"
      } else {
        return false; // return "falsy" value to indicate invalid data
      }
    })
    .withMessage("Select correct file type."),
  check("due_date")
    .trim()
    .optional()
    .isString()
    .withMessage("Bill amount must be a STRING!"),
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
