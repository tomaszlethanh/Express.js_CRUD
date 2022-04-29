const RentalRepository = require('../repository/sequelize/RentalRepository');
const CarRepository = require('../repository/sequelize/CarRepository');
const ClientRepository = require('../repository/sequelize/ClientRepository');
const {showAddRentalForm} = require("./rentalController");

exports.showRentalList = (req, res) => {
    RentalRepository.getRentals()
        .then(rentals => {
            res.render('pages/rental/list', {
                rentals: rentals,
                navLocation: 'rental'
            });
        });
};

exports.showAddRentalForm = (req, res) => {
    let allCars, allClients;
    CarRepository.getCars()
        .then(cars => {
            allCars = cars;
            return ClientRepository.getClients()
        })
        .then(clients => {
            allClients = clients;
            res.render('pages/rental/form', {
                rental: {},
                allCars: allCars,
                allClients: allClients,
                pageTitle: 'New rental',
                formMode: 'createNew',
                btnLabel: 'Add new rental',
                formAction: '/rentals/add',
                navLocation: 'rental',
                validationErrors: []
            });
        });
};

exports.showRentalDetails = (req, res) => {
    const rentalId = req.params.rentalId;
    let allCars, allClients;

    CarRepository.getCars()
        .then(cars => {
            allCars = cars;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            return RentalRepository.getRentalById(rentalId);
        })
        .then(rental => {
            res.render('pages/rental/form', {
                rental: rental,
                formMode: 'showDetails',
                pageTitle: 'Rental details',
                formAction: '',
                navLocation: 'rental',
                allClients: allClients,
                allCars: allCars,
                validationErrors: []
            });
        });
};

exports.showEditRentalForm = (req, res) => {
    const rentalId = req.params.rentalId;
    let allCars, allClients;

    CarRepository.getCars()
        .then(cars => {
            allCars = cars;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            return RentalRepository.getRentalById(rentalId);
        })
        .then(rental => {
            res.render('pages/rental/form', {
                rental: rental,
                formMode: 'edit',
                pageTitle: 'Rental edit',
                formAction: '/rentals/edit',
                navLocation: 'rental',
                btnLabel: 'Edit rental',
                allClients: allClients,
                allCars: allCars,
                validationErrors: []
            });
        });
};

exports.addRental = (req, res) => {
    const rentalData = { ...req.body };
    // console.log(rentalData);
    RentalRepository.createRental(rentalData)
        .then(result => {
            res.redirect('/rentals')
        })
        .catch(err => {
            // console.log(err);
            let allCars, allClients;
            CarRepository.getCars()
                .then(cars => {
                    allCars = cars;
                    return ClientRepository.getClients();
                })
                .then(clients => {
                    allClients = clients;

                    res.render('pages/rental/form', {
                        rental: rentalData,
                        formMode: 'invalid',
                        pageTitle: 'New rental',
                        formAction: '/rentals/add',
                        navLocation: 'rental',
                        btnLabel: 'Add new car',
                        allClients: allClients,
                        allCars: allCars,
                        validationErrors: err.errors
                    });
                });
        })

};

exports.updateRental = (req, res) => {
    const rentalId = req.body._id;
    const rentalData = { ...req.body };
    // console.log(rentalData);
    RentalRepository.updateRental(rentalId, rentalData)
        .then(result => {
            res.redirect('/rentals');
        })
        .catch(err => {
            let allCars, allClients;
            CarRepository.getCars()
                .then(cars => {
                    allCars = cars;
                    return ClientRepository.getClients();
                })
                .then(clients => {
                    allClients = clients;

                    res.render('pages/rental/form', {
                        rental: rentalData,
                        formMode: 'invalid',
                        pageTitle: 'Rental edit',
                        formAction: '/rentals/edit',
                        btnLabel: 'Edit rental',
                        navLocation: 'rental',
                        allClients: allClients,
                        allCars: allCars,
                        validationErrors: err.errors
                    });
                });
        });
};

exports.deleteRental = (req, res) => {
    const rentalId = req.params.rentalId;
    RentalRepository.deleteRental(rentalId)
        .then( () => {
            res.redirect('/rentals');
        });
};