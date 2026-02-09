const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { ensureAuthenticated } = require('../middleware/auth');

router.post('/', ensureAuthenticated, forumController.createForum);
router.get('/course/:courseId', ensureAuthenticated, forumController.getForumsByCourse);
router.post('/:id/messages', ensureAuthenticated, forumController.addMessage);

module.exports = router;
