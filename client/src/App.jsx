// import { io } from "socket.io";
import { Route, Routes } from "react-router-dom";
import Lobby from "./pages/Lobby";
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
      </Routes>
    </div>
  );
}

export default App;
