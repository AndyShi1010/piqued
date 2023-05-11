import express from "express";
import session from 'express-session'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import passport from 'passport'
import flash from 'connect-flash'
import {resolveBaseUrl} from "vite";
import sessions from "express-session";
import expressSession from "express-mysql-session";
import cookieParser from 'cookie-parser';
import db from "./database.js";
const createError = require("http-errors");

const store = expressSession(sessions);
const mysqlSessionStore = new store({/* Default Options*/},db);
// import path from "path";

// require('../configuration/passport.js')

const port = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));
app.use(express.JSON());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.set('views', 'svelte');

app.use(session({
  secret: 'piqued',
  resave: true,
  saveUninitialized: true
} )); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// require('../Routes/authentication.js')(app, passport);
app.use(cookieParser());
app.use(sessions({
  key: "sid",
  secret: "piqued",
  store: mysqlSessionStore,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  saveUninitialized: false
}));


// app.get("/api/v1/hello", (_req, res) => {
//   res.json({ message: "Hello, world!" });
//   console.log("YAAAYY");
// });

app.get("/api/search", (req, res) => {
  console.log(req.query);
  let type = req.query.by;
  let query = req.query.q;
  res.json({
    message: "Hello World!",
    by: type,
    query: query
  });
  console.log(type, query);
  console.log("Search Route");

  let sql = ``;
  db.execute(sql, function(err, results){
    if(err) throw err;
    if(results && results.length > 0){
      res.send(JSON(results))
      res.redirect("/#/searchpage")
    } else {
      res.send(404);
    }
    console.log(results);
  });

})



app.use("/", express.static('dist'));

app.use("/api/test", (req, res) => {
  res.redirect('/#/test');
})

app.use("/api/login", (req, res) => {
  res.redirect('/#/login');
})

app.use("/api/signup", (req, res) => {
  res.redirect('/#/signup');
})

//connect to port
app.use("/*", (req, res) => {
  res.redirect('/#/404');
})

app.listen(port, () => {
  console.log("Server listening on port", port);
});

app.use((request, response, next) => {
  next(createError(404));
});


