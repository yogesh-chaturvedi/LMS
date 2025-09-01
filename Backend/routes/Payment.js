const express = require('express');
const varifyUser = require('../middleware/varifyUser');
const router = express.Router();
const CourseModel = require('../models/Course');
const UserModel = require('../models/User');
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SK);


router.post('/checkout', varifyUser, async (req, res) => {
    const { course } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "inr", // or "inr" if in India
                        product_data: {
                            name: course.title,
                            images: [course.thumbnail],
                        },
                        unit_amount: course.price * 100, // price in cents/paise
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.CLIENT_URL}/success?courseId=${course._id}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        })

        res.status(200).json({ message: 'done', url: session.url })
    }
    catch (error) {
        console.error("Stripe checkout error:", error);
        res.status(400).json({ message: 'Stripe Checkout fails', success: false, error });
    }
})



router.get('/get-course/:courseId', varifyUser, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        if (req.user.role === 'user') {
            const course = await CourseModel.findById(courseId);

            if (!course) {
                return res.status(404).json({ message: 'Course not found', success: false })
            }

            return res.status(200).json({ message: 'Your Course', success: true, course })

        }
        else {
            return res.status(400).json({ message: 'Sorry You can not buy this course', success: false })
        }
    }
    catch (error) {
        console.error("error:", error);
        res.status(400).json({ message: 'Something went wront', success: false, error });
    }
})



// to add courses in purchased courses
router.post("/add-course", varifyUser, async (req, res) => {
    try {
        const { courseId } = req.body;
        if (req.user.role === 'user') {
            const course = await CourseModel.findById(courseId);

            if (!course) {
                return res.status(404).json({ message: 'Course not found', success: false })
            }

            const user = await UserModel.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found', success: false })
            }

            const isPresent = user.purchasedCourses.includes(courseId);
            if (isPresent) {
                return res.status(400).json({ message: 'You already purchased this course', success: false })
            }
            else {
                user.purchasedCourses.push(courseId);
                await user.save();
                return res.status(200).json({ message: 'User updated with new Course', success: true, updatedUser: user });
            }


        }
    }
    catch (error) {
        console.error("error:", error);
        res.status(400).json({ message: 'Something went wront', success: false, error });
    }

})

module.exports = router;