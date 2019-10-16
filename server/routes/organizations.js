const express = require('express');
const router = express.Router();
// Middleware
const authMiddleware = require('../middleware/auth');

const organizationController = require('../controllers/organization');

router.post('/:clientId', authMiddleware.validateToken, organizationController.Create);

router.get('/', authMiddleware.validateToken, organizationController.Find);

router.get('/:id', organizationController.FindById);

router.put('/:id', authMiddleware.validateToken, organizationController.Update);

router.delete('/:id', authMiddleware.validateToken, organizationController.Delete);

//RELATIONAL ROUTES
//FIND ORGANIZATION DIVISIONS
router.get('/divisions/:organizationId', authMiddleware.validateToken, organizationController.FindDivisions);

module.exports = router;