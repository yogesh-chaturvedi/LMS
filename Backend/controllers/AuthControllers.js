const express = require('express')
const UserModel = require('../models/User')
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    try {

        const isPresent = await UserModel.findOne({ email: userEmail });

        if (isPresent) {
            res.status(400).json({ message: "Already have an account", success: false })
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10)
        const user = new UserModel({
            name: userName,
            email: userEmail,
            password: hashedPassword
        })

        await user.save();
        res.status(200).json({ message: "Account has been created", success: true })
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: "Something went wrong", success: false, error })
    }
}

module.exports = signup