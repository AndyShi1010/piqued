const express = require("express");
const Post = require("../models/posts");
import router from express
// const router = express.Router();

router.get("/api/search", async (req, res) => {
    console.log(req.query);
    console.log("Search redirect");
    // res.render("/#/searchpage", 
    // {
    //     postsFiltered: await Post.searchSQL()

    // })
  
  })

//   module.exports = router;
export default router
