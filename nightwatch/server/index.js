require('dotenv').config();
const express = require('express')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , controller = require('./controllers.js/Controller')
    , session = require('express-session')
    , Auth0Strategy = require('passport-auth0')
    , passport = require('passport')

    
const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
} = process.env

const app = express();
app.use(bodyParser.json());


massive(CONNECTION_STRING).then((db) => {
    console.log('db connected')
    app.set('db', db)
});


//Order Is Important!
//Session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//Comes after Session
app.use(passport.initialize());
//Comes after Initialize
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {

    let db = app.get('db');
    let { givenName, familyName } = profile.name;
    let { id } = profile;
    console.log(done.toString());
    db.find_user([id]).then((foundUser) => {
        if (foundUser[0]) {
            console.log('found user', foundUser[0])
            try {
                done(null, foundUser[0].user_id)
            } catch (err) {
                console.error(err)
            }
        } else {
            db.create_user([givenName, familyName, id]).then((user) => {
                console.log('found user', user[0])
                try {
                    done(null, user[0].user_id)
                } catch (err) {
                    console.error(err)
                }
            })
        }
    })
}
))







passport.serializeUser((id, done) => {
    console.log('serialize', id)
    done(null, id)
})

passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id]).then((user) => {
        // console.log('deserialize')
        done(null, user[0])
    })
})

app.get('/login', (req, res, next) => {
    console.log('hit endpoint')
    next();
}, passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'https://google.com/'
}))
app.get('/auth/me', function (req, res) {
    if (req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('ur mom gey')
    }
})



app.listen(SERVER_PORT, () => {
    console.log(`We are many, You are one on ${SERVER_PORT}`)
});