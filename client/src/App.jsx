// import { io } from "socket.io";
import { Route, Routes } from "react-router-dom";
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";
function App() {
  //   const socket = io("ws://localhost:8080");
  //   socket.on("hello", (arg) => {
  //     console.log("received message in client", arg);
  //   });
  //   socket.emit("howdy", "client Message"); //server lai message
  return (
    <div>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
