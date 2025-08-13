const jwt = require('jsonwebtoken');

const varifyUser = (req, res, next) => {
    const token = req.cookies.Token
    try {
        if (!token) {
            return res.status(400).json({ message: "You are not authorized", success: false })
        }
        else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
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