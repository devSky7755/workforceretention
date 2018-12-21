const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const employeeController = require('../controllers/employee');

const MIME_TYPE_MAP = {
    'text/csv': 'csv'
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: function (req, file, cb) {
        const fileNameWithoutExtension = file.originalname.split('.').slice(0, -1).join('.');
        const name = fileNameWithoutExtension.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

const upload = multer({storage: storage});

router.post('/upload/:clientId', upload.single('employees'), employeeController.Upload);

router.post('/:clientId', employeeController.Create);

router.get('/', employeeController.Find);

router.get('/:id', employeeController.FindById);

router.put('/:id', employeeController.Update);

router.delete('/:id', employeeController.Delete);


module.exports = router;