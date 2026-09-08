const { checkRequest } = require("../commons/common-functions");
const { auth } = require("../middlware");
const {
  loginValidations,
  verifyValidations,
} = require("../validations/Auth.validate");

module.exports = (app) => {
  const users = require("../controllers/AuthController");
  var router = require("express").Router();

  router.post("/login", loginValidations, users.login);
  router.post("/verify-otp", verifyValidations, users.verifyOTP);
  // router.post("/verify", (req, res) => {
  //   res.json("okay");
  // });

  router.get("/user", auth, (req, res) => {
    checkRequest(req.user.phone, res);
    checkRequest("okay", res);
  });

  app.use("/api/v1/auth", router);
};
