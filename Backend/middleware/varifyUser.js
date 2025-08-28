const jwt = require('jsonwebtoken');
const UserModel = require('../models/User')

const varifyUser = async (req, res, next) => {
    const token = req.cookies.Token
    try {
        if (!token) {
            return res.status(400).json({ message: "You are not authorized", success: false })
        }
        else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // fetching frest data 
            const user = await UserModel.findById(decoded.id);

            if (!user) {
                return res.status(400).json({ message: "User not found", success: false })
            }
            req.user = user;
            // console.log(req.user)
            next();
        }
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Something went wront", success: false, error })
    }
}


module.exports = varifyUser;