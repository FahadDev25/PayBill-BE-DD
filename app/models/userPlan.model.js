module.exports = (sequelize, Sequelize) => {
  const UserPlan = sequelize.define("user_plans", {
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    plan_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "plans",
        key: "id",
      },
      allowNull: false,
    },
    price: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    expiry_date: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    is_expire: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      default: 1,
      allowNull: false,
    },
  });
  return UserPlan;
};
