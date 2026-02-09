const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    enrollmentKey: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    targetAudience: {
        type: String,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    materials: [{
        title: String,
        type: {
            type: String, // 'video', 'document', etc.
            enum: ['video', 'document'],
        },
        url: String,
    }],
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
