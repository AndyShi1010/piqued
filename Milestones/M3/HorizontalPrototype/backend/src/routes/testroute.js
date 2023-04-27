const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("test home route");
});

module.exports = router;