import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../contextSocket/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../peerconnection/Rtc";
function Room() {
  const socket = useSocket();
  const [remoteSocketID, setRemoteSocketId] = useState(null);
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email is ${email} joined room`);

    setRemoteSocketId(id);
  }, []);
  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);

      const ans = await peer.getAnswer(offer);
      console.log(`from, offer ko console ho yo ${offer} ${from} `);
      socket.emit("call-accepted", { to: from, ans });
    },
    [socket]
  );
  const handleCallAccepted = useCallback(({ from, ans }) => {
    peer.setLocalDescription(ans);
    console.log("call accepted");
  }, []);
  useEffect(() => {
    socket.on("user-joined", handleUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted]);
  const [myStream, setMyStream] = useState();
  const handleUserCall = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user-call ", { to: remoteSocketID, offer });
    setMyStream(stream);
  }, [remoteSocketID, socket]);
  return (
    <div className=" flex flex-col  items-center justify-center">
      <h1 className="text-3xl font-bold">Video call here</h1>
      <h1>
        {remoteSocketID ? "connected" : "No one is in room wait madi brother"}
      </h1>

      {remoteSocketID && (
        <button
          onClick={handleUserCall}
          className="border-2 bg-black text-white w-24"
        >
          Call
        </button>
      )}

      <h1>Your video</h1>
      {myStream && (
        <ReactPlayer
          playing
          muted
          height="300px"
          width="500px"
          url={myStream}
        />
      )}
    </div>
  );
}

export default Room;
