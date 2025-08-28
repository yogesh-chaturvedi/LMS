const express = require('express')
const UserModel = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// for signup 
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


// for login
const login = async (req, res, next) => {
    const { userEmail, userPassword } = req.body;
    try {
        const user = await UserModel.findOne({ email: userEmail });
        if (user) {
            const isMatch = await bcrypt.compare(userPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Incorrect Password", success: false })
            }
            else {
                const token = jwt.sign({ email: user.email, id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET);
                res.cookie("Token", token, {
                    secure: false,        // only for localhost dev
                    httpOnly: true,
                    sameSite: 'lax',      // works with http://localhost
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                return res.status(200).json({ message: "Login Successful", success: true });
            }
        }
        else {
            return res.status(400).json({ message: "User Not Found", success: false })
        }

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong", success: false, error })
    }
}




module.exports = { signup, login }