import { ReactNode, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};

const initialValue: SocketContextType = {
  socket: null,
};

export const SocketContext = createContext(initialValue);

type Props = {
  children: ReactNode;
};

export const SocketContextProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket | null>(initialValue.socket);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_APP_SOCKET_SERVER_URL}`);
    setSocket(newSocket);

    console.log("Socket initialized.");

    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected.");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
};
