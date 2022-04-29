const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Client = sequelize.define("Client", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Field is required",
      },
      len: {
        args: [2, 60],
        msg: "Field should be between 2 and 60 characters",
      },
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Field is required",
      },
      len: {
        args: [2, 60],
        msg: "Field should be between 2 and 60 characters",
      },
    },
  },
  pesel: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: "Field is required",
      },
      len: {
        args: [11, 11],
        msg: "Field should be 11 digits",
      },
      is: {
        args: /^[0-9]+$/,
        msg: "Field only accepts digits",
      },
    },
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Field is required",
      },
      len: {
        args: [9, 9],
        msg: "Field should be 9 digits long",
      },
      is: {
        args: /^[0-9]+$/,
        msg: "Field only accepts digits",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Client;
