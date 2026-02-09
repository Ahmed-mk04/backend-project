const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { ensureAuthenticated, ensureTeacherOrAdmin } = require('../middleware/auth');

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourse);
router.post('/', ensureAuthenticated, ensureTeacherOrAdmin, courseController.createCourse);
router.post('/:id/enroll', ensureAuthenticated, courseController.enrollCourse);

module.exports = router;
