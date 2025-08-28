const express = require('express');
const varifyUser = require('../middleware/varifyUser');
const router = express.Router();
const UserModel = require('../models/User')

router.put('/edit/:userId', varifyUser, async (req, res) => {
    const { newData } = req.body;
    const userId = req.params.userId;
    try {
        if (req.user.role === 'user') {
            // console.log(userId)
            // console.log(newData.name, newData.email,newData.imageUrl)

            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(400).json({ message: 'User not found', success: false })
            }
            user.name = newData.name
            user.email = newData.email
            // user.name=newData.name     --> i will add it later when i ad this field in database

            await user.save();
            return res.status(200).json({ message: 'present', success: true, user })
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



module.exports = router