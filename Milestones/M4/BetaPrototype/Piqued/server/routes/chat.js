const express = require("express");
const db = require("mysql2");

const router = express.Router();

router.post("/", (request, response) => {
  const io = request.app.get("io");

  const { message } = request.body;
  const sender = request.session.user.username;

  io.emit("chat-message", { message, sender });
});

module.exports = router;