const express = require('express')
const router = express.Router()
const UserModel = require('../models/User')
const Joi = require('joi');
const bcrypt = require('bcrypt');


// to validate new password 
const validation = (req, res, next) => {
    const { newPassword } = req.body;
    try {
        const schema = Joi.object({
            password: Joi.string().min(5).max(12).required(),
        })

        const { error } = schema.validate({
            password: newPassword
        })

        if (error) {
            return res.status(400).json({ message: 'Validation Error', success: false, error })
        }

        next()
    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
}


router.post('/reset', validation, async (req, res) => {
    try {
        const { userEmail, newPassword, confirmPassword } = req.body;
        const user = await UserModel.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User Not Found', success: false })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Confirmed Password Is Different', success: false })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save()
        return res.status(200).json({ message: 'Password Reset Successfully', success: true })

    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
})


module.exports = router