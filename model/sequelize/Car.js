const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Car = sequelize.define('Car', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Field is required'
            },
            len: {
                args: [2, 60],
                msg: 'Field should be between 2 and 60 characters'
            }
        }
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Field is required',
            },
            len: {
                args: [2, 60],
                msg: 'Field should be between 2 and 60 characters'
            }
        }
    },
    registrationNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Field is required',
            },
            len: {
                args: [3, 8],
                msg: 'Field should be between 3 and 8 characters'
            },
            isAlphanumeric: {
                msg: 'Field should be alphanumeric'
            }
        }
    },
    numberOfSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Field is required',
            },
            len: {
                args: [1, 2],
                msg: 'Field should be between 1 and 2 characters'
            },
            isInt: {
                msg: 'Field only accepts digits'
            }
        }
    }
});

module.exports = Car;