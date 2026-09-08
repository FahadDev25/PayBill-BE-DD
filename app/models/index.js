const dbConfig = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model")(sequelize, Sequelize);
db.bill_companies = require("./billCompany.model")(sequelize, Sequelize);
db.user_bills = require("./userBill.model")(sequelize, Sequelize);
db.bill_payments = require("./billPayment.model")(sequelize, Sequelize);
db.plans = require("./plan.model")(sequelize, Sequelize);
db.user_plans = require("./userPlan.model")(sequelize, Sequelize);
db.planPayment = require("./planPayment.model")(sequelize, Sequelize);
db.user_balances = require("./userBalance.model")(sequelize, Sequelize);
module.exports = db;
