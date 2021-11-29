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
    clientID: '276482507549-u901h01vh27dgieio38fle3978o49qfd.apps.googleusercontent.com',
    clientSecret: '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'


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