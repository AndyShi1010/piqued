import express from "express";
// import path from "path";

const port = process.env.PORT || 3000;

const app = express();

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
  console.log("YAAAYY");
});

app.use("/", express.static('dist'));

app.use("/test", (req, res) => {
  res.redirect('/#/test');
})

app.use("/about", (req, res) => {
  res.redirect('/#/about');
})

app.listen(port, () => {
  console.log("Server listening on port", port);
});