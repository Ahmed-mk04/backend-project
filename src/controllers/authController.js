const User = require('../models/User');

exports.register = async (req, res) => {
    const {
        email,
        password,
        role,
        firstName,
        lastName,
        studentId, // for students
        year,      // for students
        domain,    // for teachers
        grade,     // for teachers
        address    // for teachers
    } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            email,
            password,
            role,
            firstName,
            lastName,
            studentId,
            year,
            domain,
            grade,
            address,
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.login = (req, res, next) => {
    // Login is handled middleware in routes
    res.status(200).json({ user: req.user });
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};
