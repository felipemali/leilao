import { useLocation } from "react-router-dom";
import { Auction } from "../../models/Auction";
import styles from "./styles.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Bid } from "../../models/Bid";
import BidCard from "../../components/BidCard";
import { SocketContext } from "../../context/SocketContext";

type Location = {
  state: {
    auction: Auction;
  };
};

const LiveAuction = () => {
  const location: Location = useLocation();
  const { auction } = location.state;

  const [bids, setBids] = useState<Bid[]>([]);

  /**
   * Este objeto contém a referência de uma div
   * que fica ao final da listagem dos lances do leilão.
   * Ela é utilizada nesta página para fazer a rolagem
   * automática da listagem para o lado de baixo.
   */
  const bottomEl = useRef<HTMLDivElement>(null);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    console.log(socket);
    if (!socket) return;

    /**
     * Inicia o leilão
     */
    socket.emit(`${import.meta.env.VITE_APP_AUCTION_STARTED_EVENT}`, auction);

    /**
     * Recebe um novo lance
     */
    socket.on(
      `${import.meta.env.VITE_APP_MESSAGE_RECEIVED_EVENT}`,
      (messageObj: Bid) => {
        console.log("Message received");
        console.log(messageObj);

        setBids((prevBids) => [...prevBids, messageObj]);
      }
    );

    return () => {
      socket.off("message");
    };
  }, [socket]);

  /**
   * Realiza a rolagem para baixo da lista de lances
   */
  useEffect(() => {
    bottomEl?.current?.scrollIntoView({ behavior: "smooth" });
  }, [bids]);

  return (
    <div className={styles.container}>
      <h1 className={styles.auctionTitle}>
        Leilão ao vivo do item "{auction.title}"
      </h1>

      <div id="scroll-area" className={styles.liveAuctionArea}>
        {bids.map((b, index) => (
          <BidCard key={index} bid={b} />
        ))}

        <div ref={bottomEl}></div>
      </div>
    </div>
  );
};

export default LiveAuction;
