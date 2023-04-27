import express from "express";
import db from "./database.js";

// import path from "path";

const port = process.env.PORT || 4000;

const app = express();

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
  console.log("YAAAYY");
});

app.post("/search", (res, req) => {

  let sql = ``;
  db.execute(sql, function(err, results){
    if(err) throw err;
    if(results && results.length > 0){
      res.send(JSON(results))
      res.redirect("/#searchpage")
    } else {
      res.send(404);
    }
    console.log(results);
  });

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