const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
var path = require("path");
const db = require("./app/models");
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//  require all routes here
require("./app/routes/AuthRoute")(app);
require("./app/routes/BillCompanyRoute")(app);
require("./app/routes/UserBillRoute")(app);
// require("./app/routes/PlanRoute")(app);

const PORT = process.env.PORT || 4000;

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
