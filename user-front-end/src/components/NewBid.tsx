import { useNewBid } from "@/hooks/useNewBid";
import Button from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Auction } from "@/models/Auction";

type Props = {
  auction: Auction;
};

export const NewBid = ({ auction }: Props) => {
  const { newBid } = useNewBid();

  const lastBidAmount = auction.bids?.length
    ? auction.bids[auction.bids.length - 1].amount
    : 0;

  const minAmount = lastBidAmount ? lastBidAmount + 10 : auction?.startBid;

  const [amount, setAmount] = useState(lastBidAmount);
  const [username, setUsername] = useState<string>();
  const [usernameTmp, setUsernameTmp] = useState<string>("");

  const handleNewBid = () => {
    newBid({
      amount,
      username,
      auctionId: auction.id,
    });
  };

  if (auction.status !== "active") {
    return null;
  }

  if (!username) {
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            id="username"
            type="text"
            value={usernameTmp}
            onChange={(e) => setUsernameTmp(e.target.value)}
            placeholder="Seu nome"
          />

          <Button onClick={() => setUsername(usernameTmp)}>Salvar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          id="amount"
          type="number"
          value={amount}
          min={minAmount}
          step="10"
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder={`Mínimo: R$ ${minAmount}`}
        />
        <Button disabled={amount < minAmount} onClick={handleNewBid}>
          Dar Lance
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        O lance deve ser pelo menos R$ 10 superior ao lance atual
      </p>
    </div>
  );
};
