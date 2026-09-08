module.exports = (sequelize, Sequelize) => {
  const Plan = sequelize.define("plans", {
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    package_details: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    features: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    category: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    period: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    price: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      default: 1,
      allowNull: false,
    },
  });
  return Plan;
};
