let LocalStrategy   = require('passport-local').Strategy;

let mysql = require('mysql');
let bcrypt = require('bcrypt-nodejs');
let dbconfig = require('./server/database.js');
let connection = mysql.createConnection(dbconfig.connection);
// connection.connect();
connection.query('USE ' + dbconfig.database);
// connection.end();

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        // connection.connect();
        connection.query("SELECT * FROM user WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
        // connection.end();
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true
            },
            function(req, username, name, email, password, done) {
                // connection.connect();
                connection.query("SELECT * FROM user WHERE username = '"+username+"'", function(err, rows) {
                    console.log(rows);
                    if (err)
                        return done(err);
                    if (rows.length) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {
                        let newUserMysql = {
                            username: username,
                            name: name,
                            email: email,
                            password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                        };

                        let insertQuery = "INSERT INTO user ( username, name, email, password ) values ('" + username +"', '" + name +"','" + email +"','"+ password +"')";
                        // connection.connect();
                        connection.query(insertQuery,[newUserMysql.username, newUserMysql.name, newUserMysql.email, newUserMysql.password],function(err, rows) {
                            newUserMysql.id = rows.insertId;

                            return done(null, newUserMysql);
                        });
                        // connection.end();
                    }
                });
                // connection.end();
            })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true
            },
            function(req, username, password, done) {
                // connection.connect();
                connection.query("SELECT * FROM user WHERE username = ?",[username], function(err, rows){
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    }

                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong username or password.'));

                    return done(null, rows[0]);
                });
                // connection.end();
            })
    );
};