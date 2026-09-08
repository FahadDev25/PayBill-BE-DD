module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    phone: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true,
    },
    f_name: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    l_name: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    CNIC: {
      type: Sequelize.STRING(25),
      allowNull: true,
      unique: true,
      unique: true,
    },
    eamil: {
      type: Sequelize.STRING(50),
      allowNull: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    g_location: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    otp: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      default: 1,
      allowNull: false,
    },
  });
  return User;
};
