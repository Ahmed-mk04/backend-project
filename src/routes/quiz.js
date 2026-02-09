const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { ensureAuthenticated } = require('../middleware/auth');

router.post('/', ensureAuthenticated, quizController.createQuiz);
router.get('/course/:courseId', ensureAuthenticated, quizController.getQuizzesByCourse);
router.post('/:id/submit', ensureAuthenticated, quizController.submitQuiz);

module.exports = router;
