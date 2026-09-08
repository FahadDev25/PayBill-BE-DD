const {
  checkRequest,
  sendResponse,
  checkDbDataExist,
  userIdExist,
} = require("../commons/common-functions");
const { validationResult } = require("express-validator/check");
const db = require("../models");

const UserBill = db.user_bills;
const BillCompanies = db.bill_companies;
const User = db.users;
BillCompanies.hasMany(UserBill);
UserBill.belongsTo(BillCompanies, {
  foreignKey: {
    name: "bill_company_id",
  },
});
exports.store = async (req, res, date) => {
  // console.log(req.file);
  // return
  try {
    if ((await userIdExist(req, res)) == false) {
      return sendResponse(res, 404, "User dosen't exist");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    req.body.user_id = req.user.user_id;
    req.body.bill_picture =
      "uploads/bills/" + date + "_" + req.file.originalname;
    UserBill.create(req.body)
      .then((data) => {
        if (data) sendResponse(res, 200, null, "Bill created successfully");
      })
      .catch((err) => {
        sendResponse(res, 500, err || "Something went wrong");
      });
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, error || "Something went wrong");
  }
};
exports.getAll = async (req, res) => {
  try {
    if ((await userIdExist(req, res)) == false) {
      return sendResponse(res, 404, "User dosen't exist");
    }
    const user_bills = await UserBill.findAll({
      include: [
        { model: BillCompanies, attributes: ["id", "name", "bill_type"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    if (user_bills != "") {
      sendResponse(res, 200, null, null, user_bills);
    } else {
      sendResponse(res, 404, "Bill not found.");
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
    const user_bill = await UserBill.findOne({
      where: { id: req.body.id },
    });
    if (user_bill != "") {
      sendResponse(res, 200, null, null, user_bill);
    } else {
      sendResponse(res, 404, "Bill not found.");
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

    const user_bill = await UserBill.update(req.body, {
      where: { id: req.body.id },
    });
    if (user_bill == 1) {
      sendResponse(res, 200, null, "Bill updated successfully");
    } else {
      sendResponse(res, 404, "error updating the bill");
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
    UserBill.destroy({ where: { id: req.body.id } })
      .then((data) => {
        if (data != "") {
          sendResponse(
            res,
            200,
            null,
            `ID: ${req.body.id}, Bill Deleted successfully`
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
