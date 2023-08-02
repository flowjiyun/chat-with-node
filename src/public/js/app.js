const messageForm = document.querySelector("#message");
const nicknameForm = document.querySelector("#nickname");
const messageList = document.querySelector("ul");

const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("message", input.value).toString());
  input.value = "";
});

nicknameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value).toString());
  input.value = "";
});

socket.addEventListener("open", () => console.log("connected to server"));
socket.addEventListener("close", () => console.log("disconnected from server"));
socket.addEventListener("message", (message) => {
  // const text = await message.data.text();
  const li = document.createElement("li");
  // li.textContent = text;
  li.textContent = message.data;
  messageList.append(li);
});
