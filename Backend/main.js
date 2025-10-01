const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
require('./models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require("fs");
const path = require('path');
const Cookies = require('cookies')
const cookieParser = require('cookie-parser')
const AuthRoute = require('./routes/AuthRoutes')
const CourseRoute = require('./routes/CourseRoutes')
const UserRoute = require('./routes/UserRoutes')
const PaymentRoute = require('./routes/Payment')
const ResetPasswordRoute = require('./routes/PasswordResetRoutes')
const CourseCreationRoute = require('./routes/CourseCreation')


const port = process.env.PORT || 3000;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(cookieParser())
app.use(bodyParser.json()) // to parse the requests which comes from the frontend...
app.use(cors({
    origin: 'lms-phi-azure.vercel.app',
    credentials: true
}))

app.get('/', (req, res) => {
    res.send('suii')
})

app.use('/auth', AuthRoute)
app.use('/course', CourseRoute)
app.use('/user', UserRoute)
app.use('/payment', PaymentRoute)
app.use('/password', ResetPasswordRoute)
app.use('/courseCreation', CourseCreationRoute)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
