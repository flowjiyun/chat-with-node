import express from "express";
import http from "http";
import WebSocket from "ws";
import SocketIo from "socket.io";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
const handleListen = () => console.log("Listening on http://localhost:3000");

// make http server with nodejs http module
const httpServer = http.createServer(app);
const wsServer = SocketIo(httpServer);

wsServer.on("connection", (socket) => {
  console.log(socket);
});

// const wss = new WebSocket.Server({ server });

// const sockets = [];

// wss.on("connection", (socket) => {
//   console.log("connected to client");
//   sockets.push(socket);
//   socket["nickname"] = "anon";
//   socket.on("close", () => console.log("disconnected from client"));
//   socket.on("message", (message) => {
//     const parsed = JSON.parse(message);
//     switch (parsed.type) {
//       case "message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname} : ${parsed.payload}`)
//         );
//       case "nickname":
//         socket["nickname"] = parsed.payload;
//     }
//   });
// });

httpServer.listen(3000, handleListen);
