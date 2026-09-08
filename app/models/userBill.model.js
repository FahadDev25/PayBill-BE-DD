module.exports = (sequelize, Sequelize) => {
  const UserBill = sequelize.define("user_bills", {
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    bill_company_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "bill_companies",
        key: "id",
      },
      allowNull: false,
    },
    bill_amount: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    bill_picture: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    due_date: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    is_payed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      default: 1,
      allowNull: false,
    },
  });
  return UserBill;
};
