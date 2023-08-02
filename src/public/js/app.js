const messageForm = document.querySelector("form");
const messageList = document.querySelector("ul");

const socket = new WebSocket(`ws://${window.location.host}`);

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
});
socket.addEventListener("open", () => console.log("connected to server"));
socket.addEventListener("close", () => console.log("disconnected from server"));
socket.addEventListener("message", async (message) => {
  const text = await message.data.text();
  console.log(text);
});
