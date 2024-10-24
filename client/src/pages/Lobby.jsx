import { useCallback, useState } from "react";

function Lobby() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log({ room, email });
    },
    [email, room]
  );

  return (
    <div className="flex flex-col items-center mt-5 justify-center min-h-screen">
      <h1 className="text-black text-center text-2xl font-bold">Lobby</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-center w-full max-w-md"
      >
        <label htmlFor="">Email Id</label>
        <input
          className="border-2 shadow-2xl rounded-xl text-center focus:outline-none focus:ring-1"
          type="text"
          placeholder="Enter your mail ID"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="">Room No.</label>
        <input
          className="border-2 shadow-2xl rounded-xl text-center focus:outline-none focus:ring-1"
          type="text"
          placeholder="Enter your Room No."
          onChange={(e) => setRoom(e.target.value)}
        />
        <button className="bg-blue-500 border-2 rounded-xl w-40 text-white p-1">
          Enter the Room
        </button>
      </form>
    </div>
  );
}

export default Lobby;
