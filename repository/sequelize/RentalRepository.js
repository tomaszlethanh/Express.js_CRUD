const Sequelize = require('sequelize');

const Car = require('../../model/sequelize/Car');
const Client = require('../../model/sequelize/Client');
const Rental = require('../../model/sequelize/Rental');

exports.getRentals = () => {
    return Rental.findAll({include: [
            {
                model: Car,
                as: 'car'
            },
            {
                model: Client,
                as: 'client'
            }
        ]});
};

exports.getRentalById = (rentalId) => {
    return Rental.findByPk(rentalId, {include: [
            {
                model: Car,
                as: 'car'
            },
            {
                model: Client,
                as: 'client'
            }
        ]});
};

exports.createRental = (data) => {
    console.log(JSON.stringify(data));

    return Rental.create({
        car_id: data.car_id,
        client_id: data.client_id,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo
    });
};

exports.updateRental = (rentalId, data) => {
    return Rental.update(data, {where: { _id: rentalId }});
}

exports.deleteRental = (rentalId) => {
    return Rental.destroy({
        where: { _id: rentalId }
    });
}

exports.deleteManyRentals = (rentalIds) => {
    return Rental.find({ _id: { [Sequelize.Op.in]: rentalIds }});
}