module.exports = (sequelize, Sequelize) => {
  const BillCompany = sequelize.define("bill_companies", {
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    bill_type: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    logo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      default: 1,
      allowNull: false,
    },
  });
  return BillCompany;
};
