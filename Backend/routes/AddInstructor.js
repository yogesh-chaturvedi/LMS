const express = require('express');
const varifyUser = require('../middleware/varifyUser');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/User')


router.post('/instructor', varifyUser, async (req, res) => {
    const { name, email, password, phone, expertise, experience, profileImage } = req.body;
    try {

        const isPresent = await UserModel.findOne({ email: email })

        if (isPresent) {
            return res.status(400).json({ message: 'Already have an account', success: false })
        }
        else {
            if (req.user.role == "admin") {
                const hashedPassword = await bcrypt.hash(password, 10);

                const instructor = new UserModel({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    role: 'instructor',
                    phone: phone,
                    expertise: expertise,
                    experience: experience,
                    profileImage: profileImage
                })

                await instructor.save();
                res.status(200).json({ message: 'Instructor Account Created', success: true })

            }
            else {
                return res.status(400).json({ message: 'Unauthorized to create instructor account', success: false })
            }
        }
    }
    catch (error) {
        console.error('error', error);
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }

})


module.exports = router


