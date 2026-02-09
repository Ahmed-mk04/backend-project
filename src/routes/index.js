const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const courseRoutes = require('./course');
const forumRoutes = require('./forum');
const quizRoutes = require('./quiz');
const assignmentRoutes = require('./assignment');

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/forums', forumRoutes);
router.use('/quizzes', quizRoutes);
router.use('/assignments', assignmentRoutes);

module.exports = router;
