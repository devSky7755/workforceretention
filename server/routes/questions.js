const express = require('express');
const router = express.Router();
// Middleware
const authMiddleware = require('../middleware/auth');

const questionController = require('../controllers/question');

router.post('/update-many/:surveyId', authMiddleware.validateToken, questionController.UpdateSurveyQuestions);

router.post('/add-many/:surveyId', authMiddleware.validateToken, questionController.CreateMany);

router.post('/:surveyId', authMiddleware.validateToken, questionController.Create);

router.get('/', authMiddleware.validateToken, questionController.Find);

router.get('/:id', authMiddleware.validateToken, questionController.FindById);

router.put('/:id', authMiddleware.validateToken, questionController.Update);

router.delete('/:id', authMiddleware.validateToken, questionController.Delete);

module.exports = router;