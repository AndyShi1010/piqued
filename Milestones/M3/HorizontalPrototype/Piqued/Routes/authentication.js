import express from'express'
import mysql from 'mysql2';
import passportLocal from 'passport-local'

const app = express();

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('Home.svelte');
    });

    app.get('/login', function(req, res) {
        res.render('Login.svelte', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/',
            failureRedirect : '/#/login',
            failureFlash : true
        // }),
        // function(req, res) {
        //     console.log("hello");
        //
        //     if (req.body.remember) {
        //         req.session.cookie.maxAge = 1000 * 60 * 3;
        //     } else {
        //         req.session.cookie.expires = false;
        //     }
        //     res.redirect('/');
        }));

    app.get('/signup', function(req, res) {
        res.render('Signup.svelte', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/#/signup',
        failureFlash : true
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
