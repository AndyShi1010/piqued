const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../../server/models/users.js");

const router = express.Router();

router.get("/#/signup", (req, res) => {
  res.render("signup");
});

router.post("/#/signup", async (request, response) => {
  const { username, name, email, password } = request.body;
  const usernameExists = Users.usernameExists(username);
  const emailExists = Users.emailExists(email);

  try {
    if (usernameExists || emailExists) {
      response.render("login");
    }
    else {
      const { id } = Users.create(username, name, email, password);
      response.redirect("/#/account");
    }
  } catch (error) {
    console.log({ error });
    response.render("signup", { username, name, email, password });
  }

});

module.exports = router;
