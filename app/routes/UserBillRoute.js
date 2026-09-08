const { auth } = require("../middlware");
const {
  storeValidations,
  getOneValidations,
  updateValidations,
} = require("../validations/UserBill.validate");
var multer = require("multer");
var date = new Date().getTime();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/bills");
  },
  filename: function (req, file, cb) {
    cb(null, date + "_" + file.originalname);
  },
});
var upload = multer({ storage: storage });

module.exports = (app) => {
  const UserBillController = require("../controllers/UserBillController");
  var express = require("express");
  var router = express.Router();

  router.post(
    "/",
    auth,
    upload.single("bill_picture"),
    storeValidations,
    (req, res) => UserBillController.store(req, res, date)
  );
  router.get("/", auth, UserBillController.getAll);
  router.post("/get-one", auth, getOneValidations, UserBillController.getOne);
  router.patch("/", auth, updateValidations, UserBillController.update);
  router.delete("/", auth, getOneValidations, UserBillController.delete);

  // app.use("/uploads/bills", express.static("uploads/bills"));

  app.use("/api/v1/user-bill", router);
};
