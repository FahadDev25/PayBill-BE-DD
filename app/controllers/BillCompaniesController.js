const {
  checkRequest,
  sendResponse,
  checkDbDataExist,
  userIdExist,
} = require("../commons/common-functions");
const { validationResult } = require("express-validator/check");
const db = require("../models");

const BillCompany = db.bill_companies;
const User = db.users;
exports.store = async (req, res) => {
  try {
    if ((await userIdExist(req, res)) == false) {
      return sendResponse(res, 404, "User dosen't exist");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    let body = req.body;
    const inputData = {
      user_id: req.user.user_id,
      name: body.name,
      bill_type: body.bill_type,
      is_active: 1,
    };
    BillCompany.create(inputData)
      .then((data) => {
        if (data) sendResponse(res, 200, null, "Company created successfully");
      })
      .catch((err) => {
        sendResponse(res, 500, err || "Something went wrong");
      });
  } catch (error) {
    sendResponse(res, 500, error || "Something went wrong");
  }
};
exports.getAll = async (req, res) => {
  try {
    if ((await userIdExist(req, res)) == false) {
      return sendResponse(res, 404, "User dosen't exist");
    }
    const bill_companies = await BillCompany.findAll({
      order: [["createdAt", "DESC"]],
    });
    if (bill_companies != "") {
      sendResponse(res, 200, null, null, bill_companies);
    } else {
      sendResponse(res, 404, "Bill copmany not found.");
    }
  } catch (error) {
    sendResponse(res, 500, error || "Something went wrong.");
  }
};
exports.getOne = async (req, res) => {
  try {
    if ((await userIdExist(req, res)) == false) {
      return sendResponse(res, 404, "User dosen't exist");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const bill_company = await BillCompany.findOne({
      where: { id: req.body.id },
    });
    if (bill_company != "") {
      sendResponse(res, 200, null, null, bill_company);
    } else {
      sendResponse(res, 404, "Bill copmany not found.");
    }
  } catch (error) {
    sendResponse(res, 500, error || "Something went wrong.");
  }
};
exports.update = async (req, res) => {
  try {
    if ((await userIdExist(req, res)) == false) {
      return sendResponse(res, 404, "User dosen't exist");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const bill_company = await BillCompany.update(req.body, {
      where: { id: req.body.id },
    });
    console.log(bill_company == 1);
    if (bill_company == 1) {
      sendResponse(res, 200, null, "Bill Company updated successfully");
    } else {
      sendResponse(res, 404, "error updating the bill company");
    }
  } catch (error) {
    sendResponse(res, 500, error || "Something went wrong.");
  }
};
exports.delete = async (req, res) => {
  try {
    if ((await userIdExist(req, res)) == false) {
      return sendResponse(res, 404, "User dosen't exist");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    BillCompany.destroy({ where: { id: req.body.id } })
      .then((data) => {
        if (data != "") {
          sendResponse(
            res,
            200,
            null,
            `ID: ${req.body.id}, Bill Company Deleted successfully`
          );
        } else {
          sendResponse(res, 404, "Data not deleted");
        }
      })
      .catch((err) => {
        if (err) {
          sendResponse(res, 500, err || "Something went wrong.");
        }
      });
  } catch (error) {
    sendResponse(res, 500, err || "Something went wrong.");
  }
};
