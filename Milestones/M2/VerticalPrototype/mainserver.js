const express = require("express");
const cors = require("cors");
const path = require("path");

const homeRoute = require("./backend/src/routes/home.js");

const app = express();
app.use(cors());
app.use("/", homeRoute);

const PORT = 5173;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});