const CarRepository = require('../repository/sequelize/CarRepository');

exports.showCarList = (req, res) => {
    CarRepository.getCars()
        .then(cars => {
            res.render('pages/car/list', {
                cars: cars,
                navLocation: 'car'
            });
    });
};

exports.showAddCarForm = (req, res) => {
    res.render('pages/car/form', {
        car: {},
        pageTitle: 'New car',
        formMode: 'createNew',
        btnLabel: 'Add new car',
        formAction: '/cars/add',
        navLocation: 'car',
        validationErrors: []
    });
};

exports.showCarDetails = (req, res) => {
    const carId = req.params.carId;
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car/form', {
                car: car,
                formMode: 'showDetails',
                pageTitle: 'Car details',
                formAction: '',
                navLocation: 'car',
                validationErrors: []
            });
        });
};

exports.showEditCarForm = (req, res) => {
    const carId = req.params.carId;
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car/form', {
                car: car,
                formMode: 'edit',
                pageTitle: 'Car edit',
                btnLabel: 'Edit car',
                formAction: '/cars/edit',
                navLocation: 'car',
                validationErrors: []
            });
        });
};

exports.addCar = (req, res) => {
    const carData = { ...req.body };
    console.log(carData);
    CarRepository.createCar(carData)
        .then( result => {
            res.redirect('/cars');
        })
        .catch(err => {
            console.log(err);
            err.errors.forEach (e => {
                if (e.path.includes('registrationNumber') && e.type === 'unique violation') {
                    e.message = "Registration number already being used";
                }
            });
            res.render('pages/car/form', {
                car: carData,
                pageTitle: 'New car',
                formMode: 'invalid',
                btnLabel: 'Add new car',
                formAction: '/cars/add',
                navLocation: 'car',
                validationErrors: err.errors
            });
        });
};

exports.updateCar = (req, res) => {
    const carId = req.body._id;
    const carData = { ...req.body };
    CarRepository.updateCar(carId, carData)
        .then( result => {
            res.redirect('/cars');
        })
        .catch(err => {
            err.errors.forEach (e => {
                if (e.path.includes('registrationNumber') && e.type === 'unique violation') {
                    e.message = "Registration number already being used";
                }
            });
            res.render('pages/car/form', {
                car: carData,
                pageTitle: 'Car edit',
                formMode: 'invalid',
                btnLabel: 'Edit car',
                formAction: '/cars/edit',
                navLocation: 'car',
                validationErrors: err.errors
            });
        });
};

exports.deleteCar = (req, res) => {
    const carId = req.params.carId;
    CarRepository.deleteCar(carId)
        .then( () => {
            res.redirect('/cars');
        });
};

