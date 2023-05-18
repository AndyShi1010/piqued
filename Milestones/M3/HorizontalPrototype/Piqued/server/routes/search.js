const express = require("express");
const Post = require("../models/posts");
const router = express.Router();

app.get("/api/search", async (req, res) => {

    res.render("/#/searchpage", 
    {
        postsFiltered: await Post.searchSQL()

    })
  
  })

  module.exports = router;
