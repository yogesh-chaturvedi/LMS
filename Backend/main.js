const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
require('./models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const Cookies = require('cookies')
const cookieParser = require('cookie-parser')
const AuthRoute = require('./routes/AuthRoutes')
const AddInstructorRoute = require('./routes/AddInstructor')
const CourseRoute = require('./routes/CourseRoutes')
const UserRoute = require('./routes/UserRoutes')
const PaymentRoute = require('./routes/Payment')
const ResetPasswordRoute = require('./routes/PasswordResetRoutes')


const port = process.env.PORT || 3000;

app.use(cookieParser())
app.use(bodyParser.json()) // to parse the requests which comes from the frontend...
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.get('/', (req, res) => {
    res.send('suii')
})

app.use('/auth', AuthRoute)
app.use('/add', AddInstructorRoute)
app.use('/course', CourseRoute)
app.use('/user', UserRoute)
app.use('/payment', PaymentRoute)
app.use('/password', ResetPasswordRoute)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
