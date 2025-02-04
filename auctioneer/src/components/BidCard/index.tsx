import { Bid } from "../../models/Bid";
import styles from "./styles.module.css";

type Props = {
  bid: Bid;
};

const BidCard = ({ bid }: Props) => {
  const moneyFormatter = Intl.NumberFormat("pt-BR", {
    currency: "brl",
    style: "currency",
  });

  return (
    <div className={styles.card}>
      <span className={styles.username}>{bid.username}:</span>
      <span className={styles.bid}>{moneyFormatter.format(bid.value)}</span>
    </div>
  );
};

export default BidCard;
