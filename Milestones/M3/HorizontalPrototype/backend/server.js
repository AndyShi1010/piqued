const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

const path = require("path");


//routes
// const testRoute = require("./src/routes/testroute.js");
const testRoute = require("../frontend/src/routes/test/+page.svelte");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.use("/", testRoute);

app.use((req,res,next) => {
    next(createError(404));
});

const PORT = 5173;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});