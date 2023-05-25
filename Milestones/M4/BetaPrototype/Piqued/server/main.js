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
import search from "./routes/search.js"
import users from "./routes/users.js"
import posts from "./routes/posts.js"

import pgSession from "connect-pg-simple"

// import { router } from "./routes/search"
// const pgSession = require("connect-pg-simple")(session);
import login from "./routes/login.js";
const store = expressSession(session);
const mysqlSessionStore = new store({/* Default Options*/},db);

const port = process.env.PORT || 4000;

const app = express();
// app.use(cors());

app.set("view engine", "svelte");
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

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

app.use(session({
  key: "sid",
  secret: "piqued",
  store: mysqlSessionStore,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  saveUninitialized: false
}));

app.use("/login", login);
app.use("/signup", signupRoute);
app.use("/users",users);
app.use("/posts",posts);
app.use("/api/search", search);
app.use("/", express.static('dist'));

//connect to port
app.listen(port, () => {
  console.log("Server listening on port", port);
});

// catch routing error
app.use((req,res,next) => {
  next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
})


