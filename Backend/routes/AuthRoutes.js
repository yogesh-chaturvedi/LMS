const express = require('express')
const router = express.Router()
const signupValidation = require('../middleware/AuthValidation')
const signup = require('../controllers/AuthControllers')

router.post('/signup', signupValidation, signup)

module.exports = router
