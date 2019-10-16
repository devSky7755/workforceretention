const express = require('express');
const router = express.Router();

// Middleware
const authMiddleware = require('../middleware/auth');

const userController = require('../controllers/user');

router.post('/', authMiddleware.validateToken, userController.Create);

router.get('/', authMiddleware.validateToken, userController.Find);

router.get('/:id', authMiddleware.validateToken, userController.FindById);

router.put('/profile/:id', authMiddleware.validateToken, userController.UpdateProfile);

router.put('/password/:id', authMiddleware.validateToken, userController.changePassword);

router.put('/:id', authMiddleware.validateToken, userController.Update);

router.delete('/:id', authMiddleware.validateToken, userController.Delete);

//SET UP RELATIONAL ROUTES
router.get('/clients/:userId', authMiddleware.validateToken, userController.FindClient);

router.get('/surveys/:userId', authMiddleware.validateToken, userController.FindSurveys);

module.exports = router;