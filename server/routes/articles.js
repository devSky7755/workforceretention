const express = require('express');
const router = express.Router();
// Middleware
const authMiddleware = require('../middleware/auth');

const multer = require('multer');
const path = require('path');

const articleController = require('../controllers/article');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',

};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/article/'))
    },
    filename: function (req, file, cb) {
        const fileNameWithoutExtension = file.originalname.split('.').slice(0, -1).join('.');
        const name = fileNameWithoutExtension.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

const upload = multer({ storage: storage });

router.post('/:userId', authMiddleware.validateToken, upload.single('image'), articleController.Create);

router.get('/', articleController.Find);

router.get('/:id', articleController.FindById);

router.put('/:id', authMiddleware.validateToken, upload.single('image'), articleController.Update);

router.delete('/:id', authMiddleware.validateToken, articleController.Delete);

module.exports = router;