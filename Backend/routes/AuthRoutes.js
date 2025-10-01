const express = require('express')
const router = express.Router()
const { signupValidation, loginValidation } = require('../middleware/AuthValidation')
const { signup, login } = require('../controllers/AuthControllers')
const varifyUser = require('../middleware/varifyUser')

router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)



// to check if token is avilable or not 
router.get('/verify', varifyUser, (req, res) => {
    res.status(200).json({
        success: true,
        userData: {
            id: req.user.id,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role,
            purchasedCourses: req.user.purchasedCourses,
            profileImage: req.user.profileImage
        }
    })
})


// to clear jwt token fron cookie
router.post('/logout', (req, res) => {
    console.log("done");
    res.clearCookie('Token', {
        httpOnly: true,
        secure: true,      //for production(true) ,, only for localhost dev(false)
        sameSite: 'none',      // works with http://localhost
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({ message: 'Logout Successfully', success: true })
})


module.exports = router
