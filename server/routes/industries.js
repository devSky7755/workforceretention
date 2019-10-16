const express = require('express');
const router = express.Router();
// Middleware
const authMiddleware = require('../middleware/auth');

const industryController = require('../controllers/industry');

router.post('/', authMiddleware.validateToken, industryController.Create);

router.get('/', authMiddleware.validateToken, industryController.Find);

router.get('/:id', authMiddleware.validateToken, industryController.FindById);

router.put('/:id', authMiddleware.validateToken, industryController.Update);

router.delete('/:id', authMiddleware.validateToken, industryController.Delete);

module.exports = router;