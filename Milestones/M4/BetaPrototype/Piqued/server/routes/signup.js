import express from "express";
import Users from "../../server/models/users.js";

const router = express.Router();


router.get("/", (req, res) => {
  res.redirect("signup");
});

router.post("/", async (request, response) => {
  const { fullname, username, email, password } = request.body;
  console.log(fullname, username, email, password)
  const usernameExists = await Users.usernameExists(username);
  const emailExists = await Users.emailExists(email);
  console.log(usernameExists, emailExists)
  try {
    if (usernameExists || emailExists) {
      response.status(400).send("Username or Email taken")
    }
    else {
      const { id } = await Users.create(username, fullname, email, password);
      // console.log(id)
      response.status(200).send("User Created")
      // response.redirect("/#/account");
    }
  } catch (error) {
    console.log({ error });
    // response.redirect("signup", { username, name, email, password });
  }

});

export default router;
