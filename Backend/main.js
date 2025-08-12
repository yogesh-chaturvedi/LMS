const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
require('./models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRoute = require('./routes/AuthRoutes')


const port = process.env.PORT || 3000;

app.use(bodyParser.json()) // to parse the requests which comes from the frontend...
app.use(cors({
    origin: 'http://localhost:5173',
    httpOnly: true
}))

app.get('/', (req, res) => {
    res.send('suii')
})

app.use('/auth', AuthRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
