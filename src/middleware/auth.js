module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ msg: 'Not authorized' });
    },
    ensureTeacherOrAdmin: function (req, res, next) {
        if (req.user && (req.user.role === 'teacher' || req.user.role === 'admin')) {
            return next();
        }
        res.status(403).json({ msg: 'Access denied: Teachers/Admins only' });
    }
};
