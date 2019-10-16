const express = require('express');
const router = express.Router();
// Middleware
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const clientController = require('../controllers/client');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',

};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/client/'))
    },
    filename: function (req, file, cb) {
        const fileNameWithoutExtension = file.originalname.split('.').slice(0, -1).join('.');
        const name = fileNameWithoutExtension.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

const upload = multer({ storage: storage });

router.post('/:userId', authMiddleware.validateToken, upload.single('image'), clientController.Create);

router.get('/assignSurvey', authMiddleware.validateToken, clientController.AssignSurvey);

router.get('/unAssignSurvey', authMiddleware.validateToken, clientController.UnAssignSurvey);

router.get('/', authMiddleware.validateToken, clientController.Find);

router.get('/:id', clientController.FindById);

router.put('/:id', authMiddleware.validateToken, upload.single('image'), clientController.Update);

router.delete('/:id', authMiddleware.validateToken, clientController.Delete);

//SET UP RELATIONAL ROUTES
router.post('/employees/:clientId', authMiddleware.validateToken, clientController.FindEmployees);

router.get('/surveys/:clientId', authMiddleware.validateToken, clientController.FindSurveys);

router.get('/organizations/:clientId', authMiddleware.validateToken, clientController.FindOrganizations);

router.get('/emails/:clientId', authMiddleware.validateToken, clientController.FindEmails);

router.get('/email_by_id/:clientId', authMiddleware.validateToken, clientController.FindEmailById);

router.post('/emails/update/:clientId', authMiddleware.validateToken, clientController.UpdateEmail);

module.exports = router;
