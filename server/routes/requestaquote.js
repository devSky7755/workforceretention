const express = require('express');
const router = express.Router();

const requestaquoteController = require('../controllers/requestaquote');

router.post('/', requestaquoteController.Create);

module.exports = router;