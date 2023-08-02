const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => console.log("connected to server"));
socket.addEventListener("close", () => console.log("disconnected from server"));
socket.addEventListener("message", (message) => {
  console.log(message.data, "from server");
});

setTimeout(() => {
  socket.send("hello i'm client");
}, 10000);
