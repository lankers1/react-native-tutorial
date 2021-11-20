require('./models/User.js')
require('./models/Track.js')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const bodyParser = require('body-parser')
const requireAuth = require('./middleware/requireAuth')

const app = express();
app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0.rozg2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
})

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo instance")
})

mongoose.connection.on('error', (e) => {
    console.error('Error connecting to mongo', e)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`You email is ${req.user.email}`)
})

app.listen(3000, () => {
    console.log('listening on 3000')
})