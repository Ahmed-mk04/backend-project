const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get all courses
// @route   GET /courses
// @access  Public
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher', 'firstName lastName');
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get single course
// @route   GET /courses/:id
// @access  Public
exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher', 'firstName lastName');
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Create a course
// @route   POST /courses
// @access  Private (Teacher/Admin)
exports.createCourse = async (req, res) => {
    const { title, description, enrollmentKey, targetAudience } = req.body;

    try {
        const newCourse = new Course({
            title,
            description,
            enrollmentKey,
            targetAudience,
            teacher: req.user.id,
        });

        const course = await newCourse.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Enroll in a course
// @route   POST /courses/:id/enroll
// @access  Private (Student)
exports.enrollCourse = async (req, res) => {
    const { enrollmentKey } = req.body;

    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        if (course.enrollmentKey !== enrollmentKey) {
            return res.status(400).json({ msg: 'Invalid enrollment key' });
        }

        // Check if already enrolled
        if (course.students.includes(req.user.id)) {
            return res.status(400).json({ msg: 'Already enrolled' });
        }

        course.students.push(req.user.id);
        await course.save();

        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
