const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/', carController.showCarList);
router.get('/add', carController.showAddCarForm);
router.get('/edit/:carId', carController.showEditCarForm);
router.get('/details/:carId', carController.showCarDetails);
router.post('/add', carController.addCar);
router.post('/edit', carController.updateCar);
router.get('/delete/:carId', carController.deleteCar);

module.exports = router;