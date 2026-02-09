const Forum = require('../models/Forum');
const Course = require('../models/Course');

exports.createForum = async (req, res) => {
    const { courseId, title } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        // Authorization check: Teacher/Admin or Student enrolled? Maybe teacher creates forum.
        // Assuming teacher/admin creates the forum topic.
        if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Not authorized to create a forum topic' });
        }

        const newForum = new Forum({
            course: courseId,
            title,
            messages: [],
        });

        const forum = await newForum.save();
        res.json(forum);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getForumsByCourse = async (req, res) => {
    try {
        const forums = await Forum.find({ course: req.params.courseId }).populate('messages.user', 'firstName lastName');
        res.json(forums);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.addMessage = async (req, res) => {
    const { content } = req.body;

    try {
        const forum = await Forum.findById(req.params.id);
        if (!forum) {
            return res.status(404).json({ msg: 'Forum topic not found' });
        }

        // Check enrollment/ownership
        const course = await Course.findById(forum.course);
        if (!course.students.includes(req.user.id) && course.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Not enrolled in this course' });
        }

        const newMessage = {
            user: req.user.id,
            content,
        };

        forum.messages.push(newMessage);
        await forum.save();

        res.json(forum);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
