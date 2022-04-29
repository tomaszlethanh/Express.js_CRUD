const sequelize = require("./sequelize");

const Car = require("../../model/sequelize/Car");
const Client = require("../../model/sequelize/Client");
const Rental = require("../../model/sequelize/Rental");

module.exports = () => {
  Car.hasMany(Rental, {
    as: "rentals",
    foreignKey: { name: "car_id", allowNull: false },
    constraints: true,
    onDelete: "CASCADE",
  });
  Rental.belongsTo(Car, {
    as: "car",
    foreignKey: { name: "car_id", allowNull: false },
  });
  Client.hasMany(Rental, {
    as: "rentals",
    foreignKey: { name: "client_id", allowNull: false },
    constraints: true,
    onDelete: "CASCADE",
  });
  Rental.belongsTo(Client, {
    as: "client",
    foreignKey: { name: "client_id", allowNull: false },
  });

  let allCars, allClients;
  return sequelize
    .sync({ force: true })
    .then(() => {
      return Car.findAll();
    })
    .then((cars) => {
      if (!cars || cars.length === 0) {
        return Car.bulkCreate([
          {
            brand: "Skoda",
            model: "Fabia",
            registrationNumber: "WY88168",
            numberOfSeats: 5,
          },
          {
            brand: "Tesla",
            model: "model Y",
            registrationNumber: "PO36668",
            numberOfSeats: 7,
          },
          {
            brand: "Mercedes",
            model: "E250",
            registrationNumber: "WP36926",
            numberOfSeats: 5,
          },
        ]).then(() => {
          return Car.findAll();
        });
      } else {
        return cars;
      }
    })
    .then((cars) => {
      allCars = cars;
      return Client.findAll();
    })
    .then((clients) => {
      if (!clients || clients.length === 0) {
        return Client.bulkCreate([
          {
            firstName: "John",
            lastName: "Smith",
            pesel: "99121200011",
            phoneNumber: "788868262",
            password: "12345",
          },
          {
            firstName: "David",
            lastName: "Chang",
            pesel: "88101000010",
            phoneNumber: "808777767",
            password: "12345",
          },
          {
            firstName: "Rachel",
            lastName: "Nichols",
            pesel: "78092222362",
            phoneNumber: "788566236",
            password: "12345",
          },
        ]).then(() => {
          return Client.findAll();
        });
      } else {
        return clients;
      }
    })
    .then((clients) => {
      allClients = clients;
      return Rental.findAll();
    })
    .then((rentals) => {
      if (!rentals || rentals.length === 0) {
        return Rental.bulkCreate([
          {
            car_id: allCars[0]._id,
            client_id: allClients[0]._id,
            dateFrom: "2020-06-12",
            dateTo: "2020-07-01",
          },
          {
            car_id: allCars[0]._id,
            client_id: allClients[1]._id,
            dateFrom: "2020-08-07",
            dateTo: "2020-08-16",
          },
          {
            car_id: allCars[1]._id,
            client_id: allClients[2]._id,
            dateFrom: "2020-03-26",
            dateTo: "2020-03-30",
          },
          {
            car_id: allCars[2]._id,
            client_id: allClients[2]._id,
            dateFrom: "2020-08-16",
            dateTo: null,
          },
        ]);
      } else {
        return rentals;
      }
    });
};
