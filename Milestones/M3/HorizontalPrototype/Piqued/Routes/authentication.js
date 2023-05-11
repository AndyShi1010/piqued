var express = require('express');
var router = express.Router();
var db = require('../conf/database');
const UserModel = require('../models/Users');
const UserError = require('../helpers/error/UserError');
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
const { regValidate } = require('../middleware/validate');
var bcrypt = require('bcrypt');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.use('/signup', regValidate);
router.post('/signup', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let confirm = req.body.password;

  UserModel.usernameExists(username)
    .then((userDoesNameExists) => {
      if (userDoesNameExists) {
        throw new UserError(
          "Registration Failed: Username already exists",
          "/singup",
          200
        );
      }
      else {
        return UserModel.emailExists(email);
      }
    })
    .then((emailDoesExists) => {
      if (emailDoesExists) {
        throw new UserError(
          "Registration Failed: Email already exists",
          "/signup",
          200
        );
      }
      else {
        return UserModel.create(username, password, email);
      }
    })
    .then((createUserId) => {
      if (createUserId < 0) {
        throw new UserError(
          "Server Error, user could not be created",
          "/signup",
          500
        );
      }
      else {
        successPrint("User.js --> User was created!");
        req.flash('success', 'User account has been made!');
        req.session.save((err)=>{
          res.redirect('/login');
        })
       
      }
    })
    .catch((err) => {
      errorPrint("User could not be made", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        req.session.save((err) => {
          res.redirect('/singup');
        })

      }
      else {
        next(err);
      }
    });
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  UserModel.authenticate(username, password)
    .then((loggedUserId) => {
      if (loggedUserId > 0) {
        successPrint(`User ${username} is logged in`);
        req.session.username = username;
        req.session.userId = loggedUserId;
        res.locals.logged = true;
        req.flash('success', 'You have been successfully logged in!');
        req.session.save(err => {
          res.redirect('/');
        })
      }
      else {
        throw new UserError("Invalid username and/or password", "/login", 200);
      }
    })
    .catch((err) => {
      errorPrint("user login failed");
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        req.session.save(err => {
          res.redirect('/login');
        })
      }
      else {
        next(err);
      }
    })
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint('session could not be destroyed.');
      next(err);
    }
    else {
      successPrint('session was destroyed');
      res.clearCookie('csid');
      res.json({ status: "OK", message: "user is logged out" });
    }
  })
});

module.exports = router;

// import express from'express'
// import mysql from 'mysql2';
// import passportLocal from 'passport-local'
// import users from './server/models/users.js'

// const app = express();

// module.exports = function(app, passport) {

//     app.get('/', function(req, res) {
//         res.render('Home.svelte');
//     });

//     app.get('/#/login', function(req, res) {
//         res.render('Login.svelte', { message: req.flash('loginMessage') });
//     });

//     app.post('/#/login', passport.authenticate('local-login', {
//             successRedirect : '/',
//             failureRedirect : '/#/login',
//             failureFlash : true
//         }),
//         function(req, res) {
//             console.log("hello");
        
//             if (req.body.remember) {
//                 req.session.cookie.maxAge = 1000 * 60 * 3;
//             } else {
//                 req.session.cookie.expires = false;
//             }
//             res.redirect('/');
//         })

//     app.get('/#/signup', function(req, res) {
//         res.render('Signup.svelte', { message: req.flash('signupMessage') });
//     });

//     app.post('/#/signup', passport.authenticate('local-signup', {
//         successRedirect : '/',
//         failureRedirect : '/#/signup',
//         failureFlash : true
//     }));

//     app.get('/#/logout', function(req, res) {
//         req.logout();
//         res.redirect('/');
//     });
// };

// function isLoggedIn(req, res, next) {

//     if (req.isAuthenticated())
//         return next();

//     res.redirect('/');
// }
