import { SocketContext } from "@/context/SocketContext";
import { useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
export * from "./useAuctionDetail";
export * from "./useAuctions";

export const useSocket = (): Socket => {
  const { socket } = useContext(SocketContext);

  return socket;
};

type TimeRemainingProps = {
  createdAt?: string;
  duration?: number;
};

export const useTimeRemaining = (props: TimeRemainingProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>();

  const getTimeRemaining = () => {
    const endTime = new Date(
      new Date(props.createdAt).getTime() + props.duration
    ).getTime();

    const distance = endTime - new Date().getTime();

    if (distance < 0) {
      setTimeRemaining("Leilão finalizado");
      return;
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeRemaining(
      `${hours ? hours + "h" : ""} ${minutes ? minutes + "m" : ""} ${seconds}s`
    );
  };

  useEffect(() => {
    if (props?.createdAt && props?.duration) {
      setInterval(() => {
        getTimeRemaining();
      }, 1000);
    }
  }, [props]);

  return { timeRemaining };
};
