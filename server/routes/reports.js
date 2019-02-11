const express = require('express');
const router = express.Router();

const reportController = require('../controllers/report');

router.get('/manager/details/:id', reportController.ManagerReportDetails);

router.post('/manager/:id', reportController.ManagerReport);

module.exports = router;
