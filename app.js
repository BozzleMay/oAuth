const express = require('express')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

const app= express()

dotenv.config()

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    //nneds to be hidden
    keys: ['********']
}))

app.use(passport.initialize())
app.use(passport.session())

//connect to mongo db

mongoose.connect('mongodb+srv://Bozzle:Balboa26@cluster0.wcncl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => {
    console.log('Connected to MongoDB')
})

//create home route

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.get('/', (req, res) => {
res.render('home', {user: req.user})
})

app.listen(3000, () => {
    console.log('App now listening on Port 3000')
})
