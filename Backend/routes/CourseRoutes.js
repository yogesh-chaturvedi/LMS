const express = require('express')
const router = express.Router();
const CourseModel = require('../models/Course')
const UserModel = require('../models/User')
const varifyUser = require('../middleware/varifyUser');
const { route } = require('./AuthRoutes');


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
                thumbnail: thumbnail,
                instructor: req.user.id
            })

            await course.save();
            return res.status(200).json({ message: 'The course is created with core details', success: true, course })
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



// to add lectures
router.post('/lecture/:id', varifyUser, async (req, res) => {
    const { lectureTitle } = req.body;
    try {
        const objId = req.params.id;
        // console.log(objId)
        // console.log(lectureTitle)

        if (req.user.role === 'instructor') {
            const course = await CourseModel.findById(objId);

            if (!course) {
                return res.status(404).json({ message: 'Course Not Found', success: false })
            }

            // console.log(course);
            course.lecture.push({
                lectureTitle: lectureTitle
            })

            await course.save();
            return res.status(200).json({ message: 'Lecture Added', success: true, course })
        }
        else {
            return res.status(400).json({ message: 'You are not Unauthorized', success: false })
        }
    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
})



// to get coursedaetails
router.get('/courseDetails/:id', varifyUser, async (req, res) => {
    try {
        const objId = req.params.id;
        if (req.user.role === 'instructor') {
            const course = await CourseModel.findById(objId)
            return res.status(200).json({ message: 'Fetched course details', success: true, course })
        }
        else {
            return res.status(400).json({ message: 'You are unauthorized', success: false })
        }

    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
})



// to remove lecture
router.delete('/removeLecture/:courseId/:lectureId', varifyUser, async (req, res) => {
    const courseId = req.params.courseId;
    const lectureId = req.params.lectureId;
    try {
        if (req.user.role === "instructor") {
            const course = await CourseModel.findByIdAndUpdate(courseId, { $pull: { lecture: { _id: lectureId } } }, { new: true })

            if (!course) {
                return res.status(404).json({ message: 'lecture not found', success: false })
            }

            return res.status(200).json({ message: 'Lecture removed successfully', success: true, course })
        }
        else {
            return res.status(400).json({ message: 'You are unauthorized', success: false })
        }
    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
})


// to add videos and isFree
router.put('/addVideo/:courseId/:lectureId', varifyUser, async (req, res) => {
    const { videoUrl, isFree } = req.body
    const CourseId = req.params.courseId;
    const LectureId = req.params.lectureId;
    try {

        if (req.user.role === 'instructor') {
            const course = await CourseModel.findById(CourseId)

            if (!course) {
                return res.status(404).json({ message: 'Course not found', success: false })
            }

            const lecture = course.lecture.id(LectureId)

            if (!lecture) {
                return res.status(404).json({ message: 'Lecture not found', success: false })
            }

            // addinf video and status also
            lecture.lectureVideo = videoUrl,
                lecture.isFree = isFree

            await course.save();
            return res.status(200).json({ message: 'Lecture video updated successfully', success: true, course });

        }
        else {
            return res.status(400).json({ message: 'You are unauthorized', success: false })
        }
    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
})


// to toggle course status 
router.put('/status/:courseId', varifyUser, async (req, res) => {
    const id = req.params.courseId;
    const { status } = req.body;
    try {
        if (req.user.role === 'instructor') {
            const course = await CourseModel.findById(id)

            if (!course) {
                return res.status(400).json({ message: 'Course not found', success: false })
            }

            if (course.status === false) {
                const allHaveVideo = course.lecture.every((lec) => lec.lectureVideo !== null)
                if (!allHaveVideo) {
                    return res.status(400).json({ message: 'Each lecture must have a video before publishing', success: false })
                }
            }

            // toggling status
            course.status = !course.status;

            await course.save();
            res.status(200).json({ message: 'Status changed successfully', success: true, course })

        }
        else {
            return res.status(400).json({ message: 'You are unauthorized', success: false })
        }

    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
})


// search route
router.post('/search', async (req, res) => {
    const searchedText = req.query.q
    try {
        const searchedCourses = await CourseModel.find({
            description: { $regex: searchedText, $options: 'i' }
        });
        res.status(200).json({ message: 'Your Searched Course', success: true, searchedCourses })
    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
})


// 
router.put('/toprated', varifyUser, async (req, res) => {
    const { courseId } = req.body
    try {
        if (req.user.role === 'admin') {

            const course = await CourseModel.findById(courseId);

            if (!course) {
                return res.status(400).json({ message: 'Course not found', success: false });
            }

            // toggle top courses
            if (course.topCourses === true) {
                course.topCourses = false;
            }
            else {
                course.topCourses = true
            }

            await course.save();
            return res.status(200).json({ message: 'Course updated', success: true, course });
        }
        else {
            console.log("absent")
        }
    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
})

// to get purchased Courses
router.get('/get-purchasedCourses', varifyUser, async (req, res) => {
    try {
        if (req.user.role === 'user') {
            const user = await UserModel.findById(req.user.id);
            const courses = await CourseModel.find({ _id: { $in: user.purchasedCourses } })
            return res.status(200).json({ message: 'Purchased coursed fetched successfully', success: true, purchasedCourse: courses });
        }
        else {
            return res.status(400).json({ message: 'User not found', success: false });
        }
    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
})

router.get("/courseInfo/:id", varifyUser, async (req, res) => {
    try {
        const courseId = req.params.id;
        if (req.user.role === 'admin') {
            const courses = await CourseModel.findById(courseId);
            return res.status(200).json({ message: 'course details fetched', success: true, courseDetails: courses });
        }
        else {
            return res.status(400).json({ message: 'User not found', success: false });
        }
    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
})


module.exports = router