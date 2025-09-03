const { ref } = require('joi');
const mongoose = require('mongoose');
const User = require('./User');


const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
    },
    instructor: {
        type: String,
        required: true
    },
    topCourses: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lecture: [
        {
            lectureTitle: {
                type: String,
                required: true
            },
            lectureVideo: {
                type: String,
            },
            isFree: {
                type: Boolean,
                default: false
            },
        },
    ]
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;