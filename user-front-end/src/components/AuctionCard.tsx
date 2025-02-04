import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Auction } from "@/models/Auction";
import { useTimeRemaining } from "@/hooks";

type Props = {
  auction: Auction;
};

export const AuctionCard = ({ auction }: Props) => {
  const navigate = useNavigate();
  const { timeRemaining } = useTimeRemaining(auction);

  const lastBid = auction.bids?.length
    ? auction.bids[auction.bids.length - 1]
    : null;

  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer hover:shadow-lg transition-shadow animate-fade-in"
      onClick={() => navigate(`/leilao/${auction.id}`)}
    >
      <CardHeader>
        <div className="relative h-48 w-full mb-1">
          <img
            src={auction.imageUrl}
            alt={auction.title}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="flex justify-between items-center">
          <CardTitle className="font-serif text-xl">{auction.title}</CardTitle>
          <Badge status={auction.status}>
            {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <div className="p-6 pt-0">
        <p className="text-muted-foreground line-clamp-2">
          {auction.description}
        </p>

        {lastBid && (
          <p className="mt-2 font-semibold text-primary">
            Maior lance: R$ {lastBid.amount}
          </p>
        )}

        <div className="p-4 bg-muted rounded-lg mt-2">
          <p className="font-medium text-center">{timeRemaining}</p>
        </div>
      </div>
    </div>
  );
};
