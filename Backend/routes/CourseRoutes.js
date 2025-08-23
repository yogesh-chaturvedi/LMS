const express = require('express')
const router = express.Router();
const CourseModel = require('../models/Course')
const varifyUser = require('../middleware/varifyUser');


// to save basic information of course
router.post('/info', varifyUser, async (req, res) => {
    const { title, subTitle, category, level, price, description, thumbnail } = req.body;
    try {

        if (req.user.role === 'instructor') {

            const course = new CourseModel({
                title: title,
                subTitle: subTitle,
                category: category,
                level: level,
                price: price,
                description: description,
                thumbnail: thumbnail
            })

            await course.save();
            return res.status(200).json({ message: 'Saved', success: true })
        }
        else {
            return res.status(404).json({ message: 'Unauthorised', success: false })
        }

    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
})



// to fetch all courses
router.get('/fetch', async (req, res) => {

    try {
        const allCourses = await CourseModel.find();
        // console.log(courses)
        res.status(200).json({ message: 'Courses fetched successfully', success: true, courses: allCourses })
    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }

})


// to update course
router.put('/update/:id', async (req, res) => {
    const { title, subTitle, category, level, price, description, thumbnail } = req.body;

    try {

        const updatedCourse = await CourseModel.findByIdAndUpdate(
            req.params.id,
            {
                title: title,
                subTitle: subTitle,
                category: category,
                level: level,
                price: price,
                description: description,
                thumbnail: thumbnail
            },
            { new: true, runValidators: true }
        )


        if (!updatedCourse) {
            return res.status(400).json({ message: 'Course not found', success: false })
        }

        res.status(200).json({ message: 'Course updated successfully', success: true, course: updatedCourse })

    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }

})


module.exports = router