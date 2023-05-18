const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../../server/models/users.js");

const router = express.Router();

router.get("/#/login", (req, res) => {
    res.render("login");
});

router.post("/#/login", async (request, response) => {
    const { username, email, password } = request.body;
    const authenticate = Users.authenticate(username, password);


    try {
        if (authenticate) {
            response.redirect("/#/account");
        } else {
            throw "Credentials invalid";
        }
    } catch (error) {
        console.log({ error });
        response.render("login");
    }

});

module.exports = router;