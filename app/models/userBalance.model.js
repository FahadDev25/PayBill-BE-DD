module.exports = (sequelize, Sequelize) => {
    const userBalance = sequelize.define("user_balances", {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
      blance_amount: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      payment_type: {
        type: Sequelize.STRING(20),
        allowNull: false,
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
    return userBalance;
  };
  