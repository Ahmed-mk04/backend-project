const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { ensureAuthenticated } = require('../middleware/auth');

router.post('/', ensureAuthenticated, assignmentController.createAssignment);
router.get('/course/:courseId', ensureAuthenticated, assignmentController.getAssignmentsByCourse);
router.post('/:id/submit', ensureAuthenticated, assignmentController.submitAssignment);

module.exports = router;
