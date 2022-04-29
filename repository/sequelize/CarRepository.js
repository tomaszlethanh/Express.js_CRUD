const Car = require('../../model/sequelize/Car');
const Client = require('../../model/sequelize/Client');
const Rental = require('../../model/sequelize/Rental');

exports.getCars = () => {
    return Car.findAll();
}

exports.getCarById = (carId) => {
    return Car.findByPk(carId,
        {
            include: [{
                model: Rental,
                as: 'rentals',
                include: [{
                    model: Client,
                    as: 'client'
                }]
            }]
        });
};

exports.createCar = (newCarData) => {
    return Car.create({
        brand: newCarData.brand,
        model: newCarData.model,
        registrationNumber: newCarData.registrationNumber,
        numberOfSeats: newCarData.numberOfSeats
    });
};

exports.updateCar = (carId, carData) => {
    return Car.update(carData, {where: {_id: carId}});
};

exports.deleteCar = (carId) => {
    return Car.destroy({
        where: { _id: carId }
    });
};