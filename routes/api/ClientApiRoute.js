const express = require('express');
const router = express.Router();

const clientApiController = require('../../api/ClientAPI');

router.get('/', clientApiController.getClients);
router.get('/:carId', clientApiController.getClientById);
router.post('/', clientApiController.createClient);
router.put('/:carId', clientApiController.updateClient);
router.delete('/:carId', clientApiController.deleteClient);

module.exports = router;