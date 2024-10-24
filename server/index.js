const { Server } = require("socket.io");

const io = new Server(8080, {
  cors: true,
});
const emailtoIdMap = new Map();
const idtoEmailMap = new Map();
io.on("connection", (socket) => {
  console.log(`socket connected ${socket.id}`);

  //   socket.emit("hello", "world"); // client lai msg
  socket.on("room-join", (arg) => {
    const { email, room } = arg;
    emailtoIdMap.set(email, socket.id);
    idtoEmailMap.set(socket.id, email);
    io.to(socket.id).emit("room-join", arg);
    console.log("received msg", arg);
  });
});
