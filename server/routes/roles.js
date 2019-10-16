const express = require('express');
const router = express.Router();
// Middleware
const authMiddleware = require('../middleware/auth');

const roleController = require('../controllers/role');

router.post('/', authMiddleware.validateToken, roleController.Create);

router.get('/', authMiddleware.validateToken, roleController.Find);

router.get('/by_user/:id', authMiddleware.validateToken, roleController.FindByUserId);

router.get('/:id', authMiddleware.validateToken, roleController.FindById);

router.put('/:id', authMiddleware.validateToken, roleController.Update);

router.delete('/:id', authMiddleware.validateToken, roleController.Delete);

module.exports = router;