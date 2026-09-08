require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../models");
const sendResponse = (res, status, err = null, msg = null, data = null) => {
  if (err == null && data != null && msg != null)
    res.status(status).json({ msg, data });
  else if (err == null && data != null) res.status(status).json({ data });
  else if (err == null && msg != null) res.status(status).json({ msg });
  else if (err != null) res.status(status).json({ err });
};

const checkRequest = (req, res) => {
  return res.json({ req });
};

const createJwtToken = async (req) => {
  const token = await jwt.sign(
    { user_id: req.id, phone: req.phone },
    process.env.JWT_SECRET,
    {
      expiresIn: "365d",
    }
  );
  return token;
};

const checkDbDataExist = async (Modal, obj) => {
  try {
    const data_exist = await Modal.count({ where: obj });
    if (data_exist == 0) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

const userIdExist = async (req, res) => {
  const user_exist = await checkDbDataExist(db.users, { id: req.user.user_id });
  return user_exist;
};

module.exports = {
  sendResponse,
  checkRequest,
  createJwtToken,
  checkDbDataExist,
  userIdExist,
};
