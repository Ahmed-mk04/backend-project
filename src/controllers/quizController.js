const Quiz = require('../models/Quiz');
const Course = require('../models/Course');

exports.createQuiz = async (req, res) => {
    const { courseId, title, questions } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Not authorized to create a quiz' });
        }

        const newQuiz = new Quiz({
            course: courseId,
            title,
            questions,
        });

        const quiz = await newQuiz.save();
        res.json(quiz);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getQuizzesByCourse = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ course: req.params.courseId });
        res.json(quizzes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.submitQuiz = async (req, res) => {
    // Implementation for student submitting answers and grading
    // For now, let's keep it simple
    res.status(501).json({ msg: 'Not implemented' });
};
