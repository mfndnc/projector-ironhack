// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// session configuration

const session = require('express-session');
const MongoStore = require('connect-mongo');
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/projector';

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
    }),
  })
);

// end of session configuration

// passport configuration
// http://www.passportjs.org/docs/configure/
const User = require('./models/User.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// passport wants to store as little data as possible in the session so it only uses
// the id's (or someting else if we would want to implement that) and not the whole
// user object
// this method is used by passport to put the id of the user into the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// this is used to retrieve the user by it's id (that is stored in the session)
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((dbUser) => {
      done(null, dbUser);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    // this logic will be executed when we log in
    User.findOne({ username: username })
      .then((userFromDB) => {
        if (userFromDB === null) {
          // there is no user with this username
          done(null, false, { message: 'Wrong Credentials' });
        } else if (!bcrypt.compareSync(password, userFromDB.password)) {
          // the password does not match
          done(null, false, { message: 'Wrong Credentials' });
        } else {
          // everything correct - user should be logged in
          done(null, userFromDB);
        }
      })
      .catch((err) => {
        next(err);
      });
  })
);

app.use(passport.initialize());
app.use(passport.session());

// end of passport configuration

// 👇 Start handling routes here
// Contrary to the views version, all routes are controled from the routes/index.js

const projects = require('./routes/projects');
app.use('/api/projects', projects);

const auth = require('./routes/auth');
app.use('/api/auth', auth);

// to deply it with only server
if (!process.env.ENVLOCAL) {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.use((req, res) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + '/client/build/index.html');
  });
}

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
