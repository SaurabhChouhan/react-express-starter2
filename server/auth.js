import passport from 'passport'
var LocalStrategy = require('passport-local')
import UserModel from "./models/userModel"
import co from 'co'


const strategy = new LocalStrategy(
    {
		usernameField: 'email',
		passwordField: 'password'
    },
    (username, password, done) => {
        console.log("inside auth.js ",username, password, done)
        co(async () => {
            try {
                let user =  await UserModel.verifyUser(username, password)
                console.log("inside auth.js user is ", user);
                if (user)
                    return done(null, user)
                else
                    return done(null, false, {message: 'Login failed'})

            } catch (ex) {
                console.log("error",ex)
                return done(null, false, {message: 'Login failed'})
            }
        })
    }
)

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})
