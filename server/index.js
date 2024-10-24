const { Server } = require("socket.io");

const io = new Server(8080, {
  cors: true,
});
io.on("connection", (socket) => {
  console.log(`socket connected ${socket.id}`);

  socket.emit("hello", "world"); // client lai msg
  socket.on("howdy", (arg) => {
    console.log("received msg", arg);
  });
});
