const {
  sendResponse,
  checkRequest,
  createJwtToken,
  checkDbDataExist,
} = require("../commons/common-functions");
const db = require("../models");
const { validationResult } = require("express-validator/check");
const { smsSend } = require("../service");

const User = db.users;
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const otp_code = Math.floor(Math.random() * 10000 + 1);
    const user = {
      phone: req.body.phone,
      otp: otp_code,
      is_active: 1,
    };

    let data_exist = await checkDbDataExist(User, { phone: user.phone });
    if (data_exist) {
      // update otp code while login
      await User.update({ otp: user.otp }, { where: { phone: user.phone } });
      // send sms here
      let sms_send = await smsSend();
      if (sms_send)
        return sendResponse(res, 200, null, "SMS send to given number", {
          otp: user.otp,
        });
    }
    // create data in db here
    User.create(user)
      .then(async (data) => {
        // send sms here
        let sms_send = await smsSend();
        if (sms_send && data)
          sendResponse(
            res,
            200,
            null,
            "SMS send to given number && USER created successfully!"
          );
      })
      .catch((err) => {
        sendResponse(
          res,
          500,
          err.message || "Some error occurred while creating the User."
        );
      });
  } catch (error) {
    sendResponse(res, 500, error || "Something went wrong");
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const user = {
      phone: req.body.phone,
      otp: req.body.otp,
    };
    const opt_exist = await checkDbDataExist(User, {
      otp: user.otp,
      phone: user.phone,
    });
    if (!opt_exist) {
      sendResponse(res, 404, "Wrong OTP");
      return;
    }
    let userData = await User.findOne({
      attributes: [
        "id",
        "phone",
        "f_name",
        "l_name",
        "CNIC",
        "address",
        "is_active",
        "createdAt",
      ],
      where: { phone: user.phone },
    });
    const tokenData = {
      id: userData.id,
      phone: userData.phone,
    };
    const token = await createJwtToken(userData);
    let data = {
      userData,
      token,
    };
    sendResponse(res, 200, null, null, data);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, error || "Something went wrong");
  }
};
