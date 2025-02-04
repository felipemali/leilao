import { SocketContext } from "@/context/SocketContext";
import { useContext } from "react";
import { Socket } from "socket.io-client";
export const useSocket = (): Socket => {
  const { socket } = useContext(SocketContext);

  return socket;
};
