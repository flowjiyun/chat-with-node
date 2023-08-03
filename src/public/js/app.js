const room = document.querySelector("#room");
const roomForm = document.querySelector("#room form");
const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");

const socket = io();
let roomName;
let nickname;

nicknameForm.hidden = true;
messageForm.hidden = true;

//1. make room
//2. when join room hidden room form

function handleJoin() {
  room.hidden = true;
  nicknameForm.hidden = false;
}

roomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = roomForm.querySelector("input");
  socket.emit("joinRoom", input.value, handleJoin);
  roomName = input.value;
  input.value = "";
});

function handleSetNickname() {
  nicknameForm.hidden = true;
  messageForm.hidden = false;
  const h2 = document.querySelector("h2");
  h2.innerText = `Room ${roomName}`;
}

nicknameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  socket.emit("setNickname", input.value, handleSetNickname);
  nickname = input.value;
  input.value = "";
});

function addMessage(msg) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  ul.appendChild(li);
}

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  const msg = input.value;
  socket.emit("newMessage", msg, roomName, nickname, () => {
    addMessage(`you: ${msg}`);
  });
  input.value = "";
});

socket.on("newMessage", (msg, nickname) => {
  addMessage(`${nickname}: ${msg}`);
});
