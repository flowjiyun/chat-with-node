import express from "express";
import http from "http";
import WebSocket from "ws";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
const handleListen = () => console.log("Listening on http://localhost:3000");

// make http server with nodejs http module
const server = http.createServer(app);

// make websocket server with ws package on top of http server
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("connected to client");
  socket.on("close", () => console.log("disconnected from client"));
  socket.on("message", (message) => {
    console.log(message.toString(), "from client");
  });
  socket.send("hello i'm server");
});

server.listen(3000, handleListen);
