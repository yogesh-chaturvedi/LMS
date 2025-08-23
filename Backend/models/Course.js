const mongoose = require('mongoose')


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
                required: true
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