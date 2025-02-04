import { useSocket } from ".";

export const useNewBid = () => {
  const socket = useSocket();

  return {
    newBid: ({ amount, username, auctionId }) => {
      socket.emit("newBid", {
        username,
        amount,
        auctionId,
      });

      console.log("mandando novo lance:");
    },
  };
};
