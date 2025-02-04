import { Auction } from "@/models/Auction";
import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchAuctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_SOCKET_SERVER_URL}/auctions`)
      .then((response) => setAuctions(response.data))
      .catch((e) => {
        console.error("Erro ao buscar leilões:", e);
      });
  }, []);

  return auctions;
};

export const useFetchAuction = (id: string) => {
  const [auction, setAuction] = useState<Auction>();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_SOCKET_SERVER_URL}/auction/${id}`)
      .then((response) => setAuction(response.data))
      .catch((e) => {
        console.error("Erro ao buscar leilões:", e.message);
      });
  }, [id]);

  return auction;
};
export const useFetchAuctionActives = () => {
  const [auction, setAuction] = useState<Auction[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_SOCKET_SERVER_URL}/auctions/active`)
      .then((response) => setAuction(response.data))
      .catch((e) => {
        console.error("Erro ao buscar leilões ativos:", e);
      });
  }, []);

  return auction;
};
