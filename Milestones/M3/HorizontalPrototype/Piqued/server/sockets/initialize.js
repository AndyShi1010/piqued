// const http = require("http");
import http from "http"
import { Server } from "socket.io";
// const { Server } = require("socket.io");

const initSockets = (app, sessionMiddleware) => {
  const server = http.createServer(app);
  const io = new Server(server);

  io.engine.use(sessionMiddleware);

  io.on("connection", (_socket) => {
    console.log("Connection");
  });

  app.set("io", io);

  return server;
};

export default initSockets;
