module.exports = (sequelize, Sequelize) => {
  const BillPayment = sequelize.define("bill_payments", {
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    user_bill_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "user_bills",
        key: "id",
      },
      allowNull: false,
    },
    transaction_no: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    transaction_amount: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    payment_type: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    is_payed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    is_submit: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      default: 1,
      allowNull: false,
    },
  });
  return BillPayment;
};
