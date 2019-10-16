const express = require('express');
const router = express.Router();
// Middleware
const authMiddleware = require('../middleware/auth');

const departmentController = require('../controllers/department');

router.post('/:divisionId', authMiddleware.validateToken, departmentController.Create);

router.get('/', authMiddleware.validateToken, departmentController.Find);

router.get('/:id', departmentController.FindById);

router.put('/:id', authMiddleware.validateToken, departmentController.Update);

router.delete('/:id', authMiddleware.validateToken, departmentController.Delete);

module.exports = router;