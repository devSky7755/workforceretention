const express = require('express');
const router = express.Router();
// Middleware
const authMiddleware = require('../middleware/auth');

const divisionController = require('../controllers/division');

router.post('/:organizationId', authMiddleware.validateToken, divisionController.Create);

router.get('/', authMiddleware.validateToken, divisionController.Find);

router.get('/:id', divisionController.FindById);

router.put('/:id', authMiddleware.validateToken, divisionController.Update);

router.delete('/:id', authMiddleware.validateToken, divisionController.Delete);

//RELATIONAL ROUTES
//GET DIVISION DEPARTMENTS
router.get('/departments/:divisionId', divisionController.FindDepartments);

module.exports = router;