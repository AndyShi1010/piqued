import express from "express";
import session from 'express-session'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import {resolveBaseUrl} from "vite";
import expressSession from "express-mysql-session";
import cookieParser from 'cookie-parser';
import db from "./databaseConnection.js";
import createError from "http-errors";
import initSockets from "./sockets/initialize.js";
import signupRoute from "./routes/signup.js"

import postsmodel from './models/posts.js';

// const posts = require("./models/posts.js")


import pgSession from "connect-pg-simple"

// import { router } from "./routes/search"
// const pgSession = require("connect-pg-simple")(session);
const store = expressSession(sessions);
const mysqlSessionStore = new store({/* Default Options*/},db);

const port = process.env.PORT || 4000;

const app = express();

app.set("view engine", "svelte");
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// app.use('/search', router);

// app.use((req, res, next)=>{
//   requestPrint(req.url);
//   next();
// });

app.use(session({
  secret: 'piqued',
  resave: true,
  saveUninitialized: true
} )); // session secret

app.use(cookieParser());

// const sessionMiddleware = session({
//   store: new pgSession({ pgPromise: db }),
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
// });

// app.use(sessionMiddleware);
// const server = initSockets(app, sessionMiddleware);

app.use(sessions({
  key: "sid",
  secret: "piqued",
  store: mysqlSessionStore,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  saveUninitialized: false
}));


// app.get("/users", (req,res) =>{
//   db.query("SELECT * FROM users")
//   .then (([results, fields])=>{
//     res.json(results);
//   })
//   .catch(err => res,json(err));
// });

app.get("/api/search", (req, res) => {
  // console.log(req.query);
  let type = req.query.by;
  let query = req.query.q;
  // const Post = require("../models/posts");
  let response = postsmodel.searchPosts(type, query);
  console.log(response);
  // res.json({
  //   message: "Hello World!",
  //   by: type,
  //   query: query
  // });
  // console.log(type, query);
  // console.log("Search Route");

  // let sql = ``;
  // db.execute(sql, function(err, results){
  //   if(err) throw err;
  //   if(results && results.length > 0){
  //     res.send(JSON(results))
  //     res.redirect("/#/searchpage")
  //   } else {
  //     res.send(404);
  //   }
  //   console.log(results);
  // });

})

app.use("/signup", signupRoute);

app.use("/", express.static('dist'));
// app.use("/#/login", (req, res) => {
//   res.redirect('/login');
// })
// app.use("/#/signup", (req, res) => {
//   res.redirect('/signup');
// })
app.use("/*", (req, res) => {
  res.redirect('/#/404');
})

//connect to port
app.listen(port, () => {
  console.log("Server listening on port", port);
});

// catch routing error
app.use((req,res,next) => {
  next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
})


