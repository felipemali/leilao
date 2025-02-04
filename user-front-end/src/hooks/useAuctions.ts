import { useFetchAuctionActives } from "@/api";
import { useSocket } from ".";
import { useEffect, useState } from "react";
import { Auction } from "@/models/Auction";

export const useAuctions = () => {
  const socket = useSocket();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const auctionsFromApi = useFetchAuctionActives();

  useEffect(() => {
    if (auctionsFromApi) {
      setAuctions(auctionsFromApi);
    }
  }, [auctionsFromApi]);

  useEffect(() => {
    if (!socket) return;

    const handleNewAuction = (auction: Auction) => {
      setAuctions((prevAuctions) => [auction, ...prevAuctions]);
    };

    const handleUpdatedAuction = (updatedAuction: Auction) => {
      setAuctions((prevAuctions) => {
        if (updatedAuction.status !== "active") {
          return prevAuctions.filter(
            (prevAuction) => prevAuction.id !== updatedAuction.id
          );
        }

        return prevAuctions.map((prevAuction) => {
          return prevAuction.id === updatedAuction.id
            ? updatedAuction
            : prevAuction;
        });
      });
    };

    socket.on("newAuction", handleNewAuction);
    socket.on("auctionUpdated", handleUpdatedAuction);

    return () => {
      socket.off("newAuction", handleNewAuction);
      socket.off("auctionUpdated", handleUpdatedAuction);
    };
  }, [socket]);

  return { auctions };
};
