const { auth } = require("../middlware");
const {
  storeValidations,
  getOneValidations,
  updateValidations,
} = require("../validations/BillCompany.validate");

module.exports = (app) => {
  const BillCompaniesController = require("../controllers/BillCompaniesController");
  var router = require("express").Router();

  router.post("/", auth, storeValidations, BillCompaniesController.store);
  router.get("/", auth, BillCompaniesController.getAll);
  router.post(
    "/get-one",
    auth,
    getOneValidations,
    BillCompaniesController.getOne
  );
  router.patch("/", auth, updateValidations, BillCompaniesController.update);
  router.delete("/", auth, getOneValidations, BillCompaniesController.delete);

  app.use("/api/v1/bill-companies", router);
};
