const bcrypt = require("bcrypt");
const Users = require("../../server/models/users.js");

router.post("/#/signup", async (request, response) => {
  const { username, name, email, password } = request.body;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  try {
    const { id } = Users.create(username, name, email, password);

    response.redirect("/");
  } catch (error) {
    response.render("signup", { username, name, email, password });
  }
});