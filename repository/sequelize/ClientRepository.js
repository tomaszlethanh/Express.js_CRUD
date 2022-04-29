const Car = require("../../model/sequelize/Car");
const Client = require("../../model/sequelize/Client");
const Rental = require("../../model/sequelize/Rental");

exports.getClients = () => {
  return Client.findAll();
};

exports.getClientById = (clientId) => {
  return Client.findByPk(clientId, {
    include: [
      {
        model: Rental,
        as: "rentals",
        include: [
          {
            model: Car,
            as: "car",
          },
        ],
      },
    ],
  });
};

exports.createClient = (newClientData) => {
  return Client.create({
    firstName: newClientData.firstName,
    lastName: newClientData.lastName,
    pesel: newClientData.pesel,
    phoneNumber: newClientData.phoneNumber,
  });
};

exports.updateClient = (clientId, clientData) => {
  return Client.update(clientData, { where: { _id: clientId } });
};

exports.deleteClient = (clientId) => {
  return Client.destroy({
    where: { _id: clientId },
  });
};

exports.findByPhoneNumber = (phoneNumber) => {
  return Client.findOne({
    where: { phoneNumber: phoneNumber },
  });
};
