const { ref, string } = require('joi');
const mongoose = require('mongoose');


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

    },
    takeaways: {
        type: String,

    },
    prerequisites: {
        type: String,

    },
    thumbnail: {
        url: {
            type: String,
            required: true
        },
        contentType: {
            type: String
        }
    },
    status: {
        type: Boolean,
        default: false,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topCourses: {
        type: Boolean,
        default: false
    },
    lecture: [
        {
            lectureTitle: {
                type: String,
                required: true
            },
            lectureVideo: {
                url: {
                    type: String
                },
                contentType: {
                    type: String
                }
            },
            isFree: {
                type: Boolean,
                default: false
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;