const { auth } = require("../middlware");
const {
  storeValidations,
  getOneValidations,
  updateValidations,
  userChoosePlanValidations,
} = require("../validations/Plan.validate");

module.exports = (app) => {
  const UserBillController = require("../controllers/UserBillController");
  var express = require("express");
  var router = express.Router();

  router.post("/", auth, storeValidations, UserBillController.store);
  router.get("/", auth, UserBillController.getAll);
  router.post("/get-one", auth, getOneValidations, UserBillController.getOne);
  router.patch("/", auth, updateValidations, UserBillController.update);
  router.delete("/", auth, getOneValidations, UserBillController.delete);

  router.post(
    "user-chooseplan",
    auth,
    userChoosePlanValidations,
    UserBillController.store
  );

  // app.use("/uploads/bills", express.static("uploads/bills"));

  app.use("/api/v1/plan", router);
};
