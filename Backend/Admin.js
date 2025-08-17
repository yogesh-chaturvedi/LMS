const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
const bcrypt = require('bcrypt');
const UserModel = require('./models/User');


mongoose.connect(process.env.MONGO_URI)
    .then((res) => {
        console.log("connected");
    })
    .catch((error) => {
        console.log("disconnected", error);
    })


async function createAdmin() {

    const admin = await UserModel.findOne({ email: process.env.ADMIN_EMAIL })

    if (admin) {
        console.log("already created")
        mongoose.disconnect();
        return;
    }
    else {


        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        const myAdmin = new UserModel({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin"
        })

        await myAdmin.save();
        console.log("admin created");
        mongoose.disconnect();

    }

}

createAdmin()
