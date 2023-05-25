import express from "express";
import Users from "../../server/models/users.js";

const router = express.Router();


router.get("/", (req, res) => {
  res.redirect("signup");
});

router.post("/", async (request, response) => {
  const { username, name, email, password } = request.body;
  const usernameExists = await Users.usernameExists(username);
  const emailExists = await Users.emailExists(email);

  try {
    if (usernameExists || emailExists) {
      // response.redirect("login");
    }
    else {
      const { id } = await Users.create(username, name, email, password);
      // response.redirect("/#/account");
    }
  } catch (error) {
    console.log({ error });
    // response.redirect("signup", { username, name, email, password });
  }

});

export default router;
