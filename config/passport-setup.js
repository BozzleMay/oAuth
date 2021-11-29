const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
   
})


passport.use(new GoogleStrategy({
    //options for the strategy
    callbackURL: '/auth/google/redirect',
    clientID: 'process.env.CLIENT_ID',
    clientSecret: 'process.env.CLIENT_SECRET'


}, (accessToken, refreshToken, profile, done) => {
    //passport callback function
    //check if user exists
    User.findOne({
        googleId: profile.id
    }).then((currentUser) => {
        if(currentUser) {
            console.log('user is ' + currentUser)
            done(null, currentUser)

        } else {
            new User({
                username: profile.displayName,
                googleId: profile.id,
                thumbnail: profile._json.image.url
            }).save()
            .then((newUser) => {
                done(null, newUser)
                console.log(newUser)
            })
        }
    })




})
)
