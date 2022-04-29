const express = require('express');
const router = express.Router();

const rentalApiController = require('../../api/RentalAPI');

router.get('/', rentalApiController.getRentals);
router.get('/:rentalId', rentalApiController.getRentalById);
router.post('/', rentalApiController.createRental);
router.put('/:rentalId', rentalApiController.updateRental);
router.delete('/:rentalId', rentalApiController.deleteRental);

module.exports = router;