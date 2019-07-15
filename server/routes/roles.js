const express = require('express');
const router = express.Router();

const roleController = require('../controllers/role');

router.post('/', roleController.Create);

router.get('/', roleController.Find);

router.get('/by_user/:id', roleController.FindByUserId);

router.get('/:id', roleController.FindById);

router.put('/:id', roleController.Update);

router.delete('/:id', roleController.Delete);

module.exports = router;