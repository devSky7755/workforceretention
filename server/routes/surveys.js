const express = require('express');
const router = express.Router();
// Middleware
const authMiddleware = require('../middleware/auth');

const surveyController = require('../controllers/survey');

router.post('/download-completed-survey', authMiddleware.validateToken, surveyController.PrintCompletedSurvey);

router.post('/:userId', authMiddleware.validateToken, surveyController.Create);

router.get('/survey-question-answer/:surveyId', surveyController.SurveyWithQuestionAnswer);

router.get('/questions/answers/:surveyId', authMiddleware.validateToken, surveyController.SurveyQuestionsAnswers);

router.get('/questions/:surveyId', surveyController.SurveyQuestions);

router.get('/clone/:surveyId', authMiddleware.validateToken, surveyController.Clone);

router.get('/', authMiddleware.validateToken, surveyController.Find);

router.get('/:id', authMiddleware.validateToken, surveyController.FindById);

router.put('/:id', authMiddleware.validateToken, surveyController.Update);

router.delete('/:id', authMiddleware.validateToken, surveyController.Delete);

module.exports = router;
