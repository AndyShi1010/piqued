import express from "express";
import sessions from "express-session";
import expressSession from "express-mysql-session";
import cookieParser from 'cookie-parser';
import db from "./database.js";

const store = expressSession(sessions);
const mysqlSessionStore = new store({/* Default Options*/},db);
// import path from "path";

const port = process.env.PORT || 4000;

const app = express();
app.use(cookieParser());
app.use(sessions({
  key: "sid",
  secret: "mau1PFR1cmh@ewv@hnb",
  store: mysqlSessionStore,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  saveUninitialized: false
}));

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
  console.log("YAAAYY");
});

app.get("/api/search", (req, res) => {
  console.log(req.query);
  let type = req.query.by;
  let query = req.query.q;
  res.json({
    message: "Hello World!",
    by: type,
    query: query
  });
  // console.log(type, query);
  // console.log("Search Route");

  // let sql = ``;
  // db.execute(sql, function(err, results){
  //   if(err) throw err;
  //   if(results && results.length > 0){
  //     res.send(JSON(results))
  //     res.redirect("/#searchpage")
  //   } else {
  //     res.send(404);
  //   }
  //   console.log(results);
  // });

})



app.use("/", express.static('dist'));

app.use("/test", (req, res) => {
  res.redirect('/#/test');
})

app.use("/login", (req, res) => {
  res.redirect('/#/login');
})

app.use("/signup", (req, res) => {
  res.redirect('/#/signup');
})

app.listen(port, () => {
  console.log("Server listening on port", port);
});