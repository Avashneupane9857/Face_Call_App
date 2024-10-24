/* eslint-disable react/prop-types */
import { createContext, useMemo } from "react";
import io from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useSocket(SocketContext);
  return socket;
};
export default function SocketProvider(props) {
  const socket = useMemo(() => io("localhost:8080"), []);
  return (
    <div>
      <SocketContext.Provider value={socket}>
        {props.children}
      </SocketContext.Provider>
    </div>
  );
}
