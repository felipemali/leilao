import { useEffect, useState } from "react";
import { useSocket } from ".";
import { useParams } from "react-router-dom";
import { useFetchAuction } from "@/api";
import { Auction } from "@/models/Auction";

export const useAuctionDetail = () => {
  const { id } = useParams();
  const socket = useSocket();
  const [auction, setAuction] = useState<Auction>();

  const auctionFromApi = useFetchAuction(id);

  useEffect(() => {
    setAuction(auctionFromApi);
  }, [auctionFromApi]);

  useEffect(() => {
    console.log("useEffect: ", auction);

    if (auction?.status === "active") {
      console.log("Leilão ativo conectando...");

      socket.on("auctionUpdated", (updatedAuction: Auction) => {
        console.log("Leilão atualizado: ", updatedAuction);

        setAuction(updatedAuction);
      });
    }
  }, [auction]);

  return { auction };
};
