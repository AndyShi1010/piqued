import express from "express";
// import path from "path";

const port = process.env.PORT || 3000;

const app = express();

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
  console.log("YAAAYY");
});

app.get("/api/search", (req, res) => {
  let type = req.query.by;
  let query = req.query.q;
  console.log(type, query);
  console.log("Search Route");
  res.send({message: "Search Response"});
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