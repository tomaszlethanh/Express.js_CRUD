const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

function checkDate(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}

const Rental = sequelize.define('Rental', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dateFrom: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Select an option'
            },
            isDate: {
                args: true,
                msg: 'Field must be a date'
            },
        }
    },
    dateTo: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            ifEmptyThenNull(value, next) {
                if (value === '') {
                    this.dateTo = null;
                }
                return next();
            },
            _isDate(value, next) {
                if (this.dateTo === null) {
                    return next();
                }
                try {
                    const date = value.toISOString().substring(0,10);
                } catch (err) {
                    throw new Error('Field must be a date');
                }
                return next();
            },
            isLaterThanDateFrom(value, next) {
                if (this.dateTo === null) {
                    return next();
                } else if (value < this.dateFrom) {
                    console.log('VALUE: ' + value);
                    throw new Error("Date to can't be earlier than date from");
                } else {
                    return next();
                }
            },
        }
    },
    client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Select an option'
            }
        }
    },
    car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Select an option'
            }
        }
    }
});

module.exports = Rental;