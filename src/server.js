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

function getRoomList() {
  const {
    sockets: {
      adapter: { rooms, sids },
    },
  } = wsServer;
  const roomList = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      roomList.push(key);
    }
  });
  return roomList;
}

wsServer.on("connection", (socket) => {
  // weclome message when join room
  // when join room
  socket.on("joinRoom", (roomName, done) => {
    socket.join(roomName);
    console.log(`${socket.id} join in ${roomName}`);
    done();
    wsServer.sockets.emit("roomChange", getRoomList());
  });
  socket.on("disconnect", () => {
    wsServer.sockets.emit("roomChange", getRoomList());
  });

  socket.on("setNickname", (nickname, done) => {
    socket["nickname"] = nickname;
    done();
  });

  socket.on("newMessage", (msg, roomName, nickname, done) => {
    socket.to(roomName).emit("newMessage", msg, nickname);
    done();
  });
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
